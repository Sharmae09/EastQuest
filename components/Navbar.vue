<template>
  <IonHeader>
    <IonToolbar class="navbar">
      <IonTitle class="title">EastQuest</IonTitle>
    </IonToolbar>
  </IonHeader>
</template>

<script setup>
import { IonHeader, IonToolbar, IonTitle } from "@ionic/vue";
</script>

<style scoped>
.navbar {
  --ion-background-color: #6200ea;
  --ion-text-color: white;
  height: 5vh; /* Adjust height of the toolbar */
  display: flex;
  align-items: center; /* Center content vertically */
}

.title {
  font-size: 0.9rem; /* Adjust title size */
  color: #ffffff;
  text-align: left; /* Align the title to the left */
}
</style>
