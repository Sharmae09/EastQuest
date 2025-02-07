<template>
  <IonPage>
    <Navbar />
    <IonContent>
      <NuxtPage />
    </IonContent>
  </IonPage>
</template>

<script setup>
import { IonPage, IonContent } from "@ionic/vue";
import Navbar from "@/components/Navbar.vue";
</script>
