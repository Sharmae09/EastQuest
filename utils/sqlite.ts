// import {
//   CapacitorSQLite,
//   SQLiteConnection,
//   SQLiteDBConnection,
// } from "@capacitor-community/sqlite";
// import { isPlatform } from "@ionic/vue";

// const sqliteConnection = new SQLiteConnection(CapacitorSQLite);

// export const useDatabase = async () => {
//   try {
//     // Create connection
//     const db = await sqliteConnection.createConnection(
//       "mydb",
//       false,
//       "no-encryption",
//       1,
//       false
//     );

//     // Open database
//     await db.open();

//     // Create a sample table
//     await db.execute(`
//       CREATE TABLE IF NOT EXISTS users (
//         id INTEGER PRIMARY KEY AUTOINCREMENT,
//         name TEXT NOT NULL
//       );
//     `);

//     console.log("Database ready!");
//     return db;
//   } catch (error) {
//     console.error("Database Error: ", error);
//   }
// };

import { databaseService } from "@/services/sqlite";

export const useDatabase = async () => {
  await databaseService.initDB();
  return databaseService;
};
