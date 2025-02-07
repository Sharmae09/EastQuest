<script setup>
import { useNuxtApp } from "#app";
import {
  signInWithRedirect,
  GoogleAuthProvider,
  getRedirectResult,
} from "firebase/auth";

const { $firebaseAuth } = useNuxtApp();

const signInWithGoogle = async () => {
  try {
    const provider = new GoogleAuthProvider();
    await signInWithRedirect($firebaseAuth, provider);
  } catch (error) {
    console.error("Sign-in failed:", error);
  }
};

// This will handle the result after the redirect
const handleRedirectResult = async () => {
  try {
    const result = await getRedirectResult($firebaseAuth);
    if (result) {
      console.log("User signed in:", result.user);
    }
  } catch (error) {
    console.error("Error getting redirect result:", error);
  }
};

// Call handleRedirectResult when the app initializes to check if the user is redirected back
handleRedirectResult();
</script>

<template>
  <button @click="signInWithGoogle">Sign in with Redirect</button>
</template>
