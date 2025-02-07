// // import { databaseService } from "./sqlite";
// // import { getFirestore, collection, addDoc } from "firebase/firestore";
// // import { Capacitor } from "@capacitor/core";

// // const db = getFirestore();

// // export async function syncSessionsToFirestore() {
// //   if (Capacitor.getPlatform() === "web" || !navigator.onLine) return;

// //   const unsyncedSessions = await databaseService.getUnsyncedSessions();
// //   if (!unsyncedSessions.length) return;

// //   for (const session of unsyncedSessions) {
// //     try {
// //       await addDoc(collection(db, "study_sessions"), {
// //         duration: session.duration,
// //         timestamp: session.timestamp,
// //       });

// //       await databaseService.markAsSynced([session.id]);
// //     } catch (error) {
// //       console.error("Sync Error:", error);
// //     }
// //   }
// // }

// import { useNuxtApp } from "#app";
// import { collection, addDoc } from "firebase/firestore";
// import { databaseService } from "./sqlite";
// import { Capacitor } from "@capacitor/core";

// export async function syncSessionsToFirestore() {
//   if (Capacitor.getPlatform() === "web" || !navigator.onLine) return;

//   const { $firebaseDb } = useNuxtApp(); // ✅ Get Firebase DB instance from Nuxt
//   if (!$firebaseDb) {
//     console.error("🔥 Firebase not initialized");
//     return;
//   }

//   const unsyncedSessions = await databaseService.getUnsyncedSessions();
//   if (!unsyncedSessions.length) return;

//   for (const session of unsyncedSessions) {
//     try {
//       await addDoc(collection($firebaseDb, "study_sessions"), {
//         duration: session.duration,
//         timestamp: session.timestamp,
//       });

//       await databaseService.markAsSynced([session.id]);
//     } catch (error) {
//       console.error("🔥 Sync Error:", error);
//     }
//   }
// }

import { useNuxtApp } from "#app";
import { databaseService } from "~/services/sqlite";
import { collection, addDoc } from "firebase/firestore";
// import { databaseService } from "./sqlite";
import { Capacitor } from "@capacitor/core";

export async function syncSessionsToFirestore() {
  if (Capacitor.getPlatform() === "web" || !navigator.onLine) return;

  const { $firebaseDb } = useNuxtApp(); // ✅ Get Firebase DB instance from Nuxt
  if (!$firebaseDb) {
    console.error("🔥 Firebase not initialized");
    return;
  }

  const unsyncedSessions = await databaseService.getUnsyncedSessions();
  if (!unsyncedSessions.length) return;

  for (const session of unsyncedSessions) {
    try {
      await addDoc(collection($firebaseDb, "study_sessions"), {
        duration: session.duration,
        timestamp: session.timestamp,
      });

      await databaseService.markAsSynced([session.id]);
    } catch (error) {
      console.error("🔥 Sync Error:", error);
    }
  }
}
