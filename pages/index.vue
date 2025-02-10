<!-- <template>
  <IonPage>
    <IonContent class="ion-padding">
      <h1>Welcome to EastQuest</h1>
      <p>Track your study time and achieve your goals!</p>

      <IonButton expand="full" @click="startTracking">
        Start Studying
      </IonButton>
      <IonButton expand="full" @click="startTracking">
        <div v-if="user">Welcome, {{ user.displayName }}</div>
        <div v-else>Please log in</div>
      </IonButton>
      <AuthButton />
      <Redirect />
      <Stopwatch />
    </IonContent>
  </IonPage>
</template>

<script setup>
import { IonPage, IonContent, IonButton } from "@ionic/vue";
import { useAuth } from "~/composables/useAuth";

const { user } = useAuth();

const startTracking = () => {
  console.log("Tracking started!");
};
</script>

<style scoped>
h1 {
  text-align: center;
  color: #6200ea;
}

p {
  text-align: center;
  font-size: 18px;
  margin-bottom: 20px;
}
</style> -->
<!-- <script setup>
import { ref, onMounted } from "vue";
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonButton,
} from "@ionic/vue";
import { databaseService } from "@/services/sqlite";

const sessions = ref([]);

const loadSessions = async () => {
  sessions.value = await databaseService.getSessions();
};

const addSession = async () => {
  await databaseService.addSession(Math.floor(Math.random() * 60));
  await loadSessions();
};

onMounted(async () => {
  console.log("⏳ Waiting for SQLite to initialize...");
  await databaseService.initDB();
  await loadSessions();
});
</script>

<template>
  <IonPage>
    <IonHeader>
      <IonToolbar>
        <IonTitle>Study Sessions</IonTitle>
      </IonToolbar>
    </IonHeader>
    <IonContent class="ion-padding">
      <IonButton @click="addSession">Add Random Session</IonButton>
      <ul>
        <li v-for="session in sessions" :key="session.id">
          {{ session.duration }} minutes - {{ session.timestamp }}
        </li>
      </ul>
    </IonContent>
  </IonPage>
</template> -->
<template>
  <div>
    <h1>Nuxt 3 with Ionic, Capacitor, and SQLite</h1>
    <button @click="testSQLite">Test SQLite</button>
  </div>
</template>

<script setup>
const { $sqlite } = useNuxtApp();

const testSQLite = async () => {
  try {
    const db = await $sqlite.createConnection('test_db');
    await db.open();
    await db.execute('CREATE TABLE IF NOT EXISTS test (id INTEGER PRIMARY KEY, name TEXT)');
    await db.execute('INSERT INTO test (name) VALUES (?)', ['Nuxt 3']);
    const result = await db.query('SELECT * FROM test');
    console.log(result.values);
    await db.close();
  } catch (error) {
    console.error(error);
  }
};
</script>