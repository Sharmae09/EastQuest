<script setup>
import { useNuxtApp } from "#app";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";

const { $firebaseAuth } = useNuxtApp();

const signInWithGoogle = async () => {
  try {
    const provider = new GoogleAuthProvider();
    const result = await signInWithPopup($firebaseAuth, provider);
    console.log("User signed in:", result.user);
  } catch (error) {
    console.error("Sign-in failed:", error);
  }
};
</script>

<template>
  <button @click="signInWithGoogle">Sign in with Google</button>
</template>
