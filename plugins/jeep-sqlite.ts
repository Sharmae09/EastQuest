import { defineNuxtPlugin } from "#app";
import "jeep-sqlite"; // Import the component globally

export default defineNuxtPlugin(() => {
  console.log("✅ Jeep-SQLite Plugin Loaded");

  if (process.client) {
    customElements.whenDefined("jeep-sqlite").then(() => {
      console.log("🔄 Jeep-SQLite Web Component Ready");
    });
  }
});
