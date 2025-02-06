<template>
  <IonPage>
    <IonHeader>
      <IonToolbar>
        <IonTitle>EastQuest</IonTitle>
      </IonToolbar>
    </IonHeader>
    <IonContent class="ion-padding">
      <IonButton @click="showAlert">Click Me</IonButton>
    </IonContent>
  </IonPage>
</template>

<script setup>
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonButton,
  alertController,
} from "@ionic/vue";

const showAlert = async () => {
  const alert = await alertController.create({
    header: "Hello!",
    message: "Welcome to EastQuest!",
    buttons: ["OK"],
  });
  await alert.present();
};
</script>
