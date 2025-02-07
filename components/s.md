<template>
  <div class="stopwatch">
    <h2 class="text-2xl font-bold">Study Timer</h2>
    <!-- Tiimer COUNTER -->
    <p class="text-xl">{{ formattedTime }}</p>
    <div class="mt-4 flex gap-2">
      <!-- START BTN -->
      <button @click="startStopwatch" :disabled="running" class="btn">
        Start
      </button>
      <!-- STOP BTN -->
      <button @click="stopStopwatch" :disabled="!running" class="btn">
        Stop
      </button>
      <!-- RESET BTN -->
      <button @click="resetStopwatch" class="btn">Reset</button>
    </div>

    <h3 class="text-lg font-bold mt-6">Saved Sessions</h3>
    <ul>
      <!-- FOR LOOP TO DISPLAY T HE SESSIONS DATA -->
      <li v-for="session in sessions" :key="session.id">
        {{ session.duration }} seconds - {{ session.timestamp }}
      </li>
    </ul>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import { databaseService } from "@/services/sqlite";
import { syncSessionsToFirestore } from "@/services/firestoreSync";

const time = ref(0);
const running = ref(false);
const sessions = ref([]);
let timerInterval = null;

// MAKE THE COUNT START
const startStopwatch = () => {
  if (!running.value) {
    running.value = true;
    timerInterval = setInterval(() => {
      time.value++;
    }, 1000);
  }
};

// STOP THE COUNT
const stopStopwatch = async () => {
  if (running.value) {
    running.value = false;
    clearInterval(timerInterval);

    // Save session to SQLite
    await databaseService.saveSession(time.value);

    // Sync data to Firestore
    syncSessionsToFirestore();

    // Refresh saved sessions
    await loadSessions();
  }
};

// RESET THE COUNT
const resetStopwatch = () => {
  if (!running.value) {
    time.value = 0;
  }
};

// COUNT THE TIME
const formattedTime = computed(() => {
  const minutes = Math.floor(time.value / 60);
  const seconds = time.value % 60;
  return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
});

// Load sessions from SQLite and refresh the UI
// something is wrong with this
const loadSessions = async () => {
  sessions.value = await databaseService.getSessions();
};

onMounted(() => {
  loadSessions();
});
</script>

<style scoped>
.stopwatch {
  text-align: center;
  padding: 20px;
}
.btn {
  padding: 10px;
  background: blue;
  color: white;
  border: none;
  cursor: pointer;
}
</style>
