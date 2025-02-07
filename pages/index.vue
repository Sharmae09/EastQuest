<template>
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
</style>
