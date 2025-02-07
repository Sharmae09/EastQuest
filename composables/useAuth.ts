import { useNuxtApp } from "#app";
import { ref, onMounted } from "vue";
import { onAuthStateChanged } from "firebase/auth";

export function useAuth() {
  const { $firebaseAuth } = useNuxtApp();
  const user = ref(null);

  onMounted(() => {
    onAuthStateChanged($firebaseAuth, (firebaseUser) => {
      user.value = firebaseUser;
    });
  });

  return { user };
}
