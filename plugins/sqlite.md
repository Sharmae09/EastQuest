// import { databaseService } from "~/services/sqlite";
// import "jeep-sqlite";

// export default defineNuxtPlugin(async () => {
//   await databaseService.initDB();
//   console.log("✅ Jeep-SQLite Web Component Loaded");
// });
import { CapacitorSQLite, SQLiteConnection } from 'capacitor-sqlite';

export default defineNuxtPlugin(async () => {
  const sqlite = new SQLiteConnection(CapacitorSQLite);

  return {
    provide: {
      sqlite,
    },
  };
});