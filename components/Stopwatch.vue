<!-- <script setup>
import { ref, computed, onMounted } from "vue";
import { databaseService } from "@/services/sqlite";
import { syncSessionsToFirestore } from "@/services/firestoreSync";

const time = ref(0);
const running = ref(false);
const sessions = ref([]);
let timerInterval = null;

const startStopwatch = () => {
  if (!running.value) {
    running.value = true;
    timerInterval = setInterval(() => {
      time.value++;
    }, 1000);
  }
};

const stopStopwatch = async () => {
  if (running.value) {
    running.value = false;
    clearInterval(timerInterval);

    // ✅ Save session to SQLite after ensuring DB is initialized
    await databaseService.saveSession(time.value);

    // ✅ Sync data to Firestore
    syncSessionsToFirestore();

    // ✅ Refresh saved sessions after saving
    await loadSessions();
  }
};

const loadSessions = async () => {
  await databaseService.initDB(); // Ensure DB is initialized before fetching
  sessions.value = await databaseService.getSessions();
};

onMounted(async () => {
  await loadSessions();
});
</script> -->
<template>
  <div>
    <h2>Stopwatch</h2>
    <div>
      <span>{{ displayTime }}</span>
    </div>
    <div>
      <button @click="startStopwatch" :disabled="isRunning">Start</button>
      <button @click="stopStopwatch" :disabled="!isRunning">Stop</button>
      <button @click="resetStopwatch" :disabled="isRunning">Reset</button>
    </div>
    <h3>Previous Sessions</h3>
    <ul>
      <li v-for="session in sessions" :key="session.id">
        Duration: {{ session.duration }} seconds
      </li>
    </ul>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { databaseService } from "@/services/sqlite"; // SQLite service
import { syncSessionsToFirestore } from "@/services/firestoreSync"; // Firebase sync service

const displayTime = ref("00:00");
const isRunning = ref(false);
const startTime = ref(null);
const elapsedTime = ref(0);
const interval = ref(null);
const sessions = ref([]);

const startStopwatch = () => {
  isRunning.value = true;
  startTime.value = Date.now() - elapsedTime.value;
  interval.value = setInterval(() => {
    elapsedTime.value = Date.now() - startTime.value;
    displayTime.value = formatTime(elapsedTime.value);
  }, 1000);
};

const stopStopwatch = async () => {
  clearInterval(interval.value);
  isRunning.value = false;
  const sessionDuration = Math.floor(elapsedTime.value / 1000); // in seconds

  // Save to SQLite
  await databaseService.saveSession(sessionDuration);

  // Save to Firebase
  await syncSessionsToFirestore();

  // Reset stopwatch state
  elapsedTime.value = 0;
  displayTime.value = "00:00";

  // Reload sessions after saving
  loadSessions();
};

const resetStopwatch = () => {
  clearInterval(interval.value);
  isRunning.value = false;
  elapsedTime.value = 0;
  displayTime.value = "00:00";
};

const loadSessions = async () => {
  sessions.value = await databaseService.getSessions();
};

const formatTime = (time) => {
  const seconds = Math.floor(time / 1000);
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return `${String(minutes).padStart(2, "0")}:${String(
    remainingSeconds
  ).padStart(2, "0")}`;
};

onMounted(async () => {
  await databaseService.initDB(); // Ensure the DB is initialized
  loadSessions();
});
</script>

<style scoped>
button {
  margin: 5px;
}
</style>
