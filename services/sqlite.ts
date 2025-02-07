// import {
//   CapacitorSQLite,
//   SQLiteConnection,
//   SQLiteDBConnection,
// } from "@capacitor-community/sqlite";
// import { Capacitor } from "@capacitor/core";

// class DatabaseService {
//   private sqlite = new SQLiteConnection(CapacitorSQLite);
//   private db: SQLiteDBConnection | null = null;
//   private initialized = false;

//   async initDB() {
//     try {
//       if (this.initialized) return; // Prevent re-initialization
//       this.db = await this.sqlite.createConnection(
//         "eastquest_db",
//         false,
//         "no-encryption",
//         1,
//         false
//       );
//       await this.db.open();
//       await this.db.execute(`
//         CREATE TABLE IF NOT EXISTS study_sessions (
//           id INTEGER PRIMARY KEY AUTOINCREMENT,
//           duration INTEGER NOT NULL,
//           timestamp TEXT NOT NULL,
//           synced INTEGER DEFAULT 0
//         );
//       `);
//       this.initialized = true;
//       console.log("✅ SQLite Database Initialized");
//     } catch (error) {
//       console.error("SQLite Init Error:", error);
//     }
//   }

//   async saveSession(duration: number) {
//     await this.initDB(); // Ensure DB is initialized before use
//     if (!this.db) {
//       console.error("Database not initialized");
//       return;
//     }

//     const timestamp = new Date().toISOString();
//     await this.db.run(
//       `INSERT INTO study_sessions (duration, timestamp, synced) VALUES (?, ?, ?)`,
//       [duration, timestamp, 0]
//     );
//   }

//   async getSessions() {
//     await this.initDB(); // Ensure DB is initialized before use
//     if (!this.db) {
//       console.error("Database not initialized");
//       return [];
//     }

//     const res = await this.db.query("SELECT * FROM study_sessions");
//     console.log("📋 Fetched sessions:", res.values);
//     return res.values || [];
//   }
// }

// export const databaseService = new DatabaseService();
// await databaseService.initDB(); // ✅ Initialize the database on startup

import {
  CapacitorSQLite,
  SQLiteConnection,
  SQLiteDBConnection,
} from "@capacitor-community/sqlite";
import { Capacitor } from "@capacitor/core";

class DatabaseService {
  private sqlite = new SQLiteConnection(CapacitorSQLite);
  private db: SQLiteDBConnection | null = null;
  private initialized = false;

  // async initDB(): Promise<void> {
  //   try {
  //     if (this.initialized) return; // Prevent multiple initializations

  //     if (Capacitor.getPlatform() === "web") {
  //       console.warn(
  //         "⚠️ SQLite is not supported on the web without jeep-sqlite."
  //       );
  //       return;
  //     }

  //     this.db = await this.sqlite.createConnection(
  //       "eastquest_db",
  //       false,
  //       "no-encryption",
  //       1,
  //       false
  //     );
  //     await this.db.open();
  //     await this.db.execute(`
  //       CREATE TABLE IF NOT EXISTS study_sessions (
  //         id INTEGER PRIMARY KEY AUTOINCREMENT,
  //         duration INTEGER NOT NULL,
  //         timestamp TEXT NOT NULL,
  //         synced INTEGER DEFAULT 0
  //       );
  //     `);
  //     this.initialized = true;
  //     console.log("✅ SQLite Database Initialized");
  //   } catch (error) {
  //     console.error("❌ SQLite Init Error:", error);
  //   }
  // }
  // async initDB() {
  //   try {
  //     if (this.initialized) return;

  //     if (Capacitor.getPlatform() === "web") {
  //       const jeepEl = document.createElement("jeep-sqlite");
  //       document.body.appendChild(jeepEl);
  //       await customElements.whenDefined("jeep-sqlite");
  //       console.log("🔄 jeep-sqlite defined");

  //       // Small delay to ensure it's ready
  //       await new Promise((res) => setTimeout(res, 500));

  //       await this.sqlite.initWebStore();
  //       console.log("✅ Web store initialized");
  //     }

  //     this.db = await this.sqlite.createConnection(
  //       "eastquest_db",
  //       false,
  //       "no-encryption",
  //       1,
  //       false
  //     );
  //     await this.db.open();
  //     this.initialized = true;

  //     await this.db.execute(`
  //       CREATE TABLE IF NOT EXISTS study_sessions (
  //         id INTEGER PRIMARY KEY AUTOINCREMENT,
  //         duration INTEGER NOT NULL,
  //         timestamp TEXT NOT NULL,
  //         synced INTEGER DEFAULT 0
  //       );
  //     `);
  //     console.log("✅ SQLite Database Initialized");
  //   } catch (error) {
  //     console.error("❌ SQLite Init Error:", error);
  //   }
  // }
  // async initDB() {
  //   try {
  //     if (this.initialized) return;

  //     // Initialize SQLite connection
  //     this.sqlite = new SQLiteConnection(CapacitorSQLite);

  //     if (Capacitor.getPlatform() === "web") {
  //       if (!customElements.get("jeep-sqlite")) {
  //         const jeepEl = document.createElement("jeep-sqlite");
  //         document.body.appendChild(jeepEl);
  //         await customElements.whenDefined("jeep-sqlite");
  //         console.log("🔄 jeep-sqlite defined");
  //       }

  //       // Initialize Web Store
  //       await this.sqlite.initWebStore();
  //       console.log("✅ Web store initialized");
  //     }

  //     // Create database connection
  //     this.db = await this.sqlite.createConnection(
  //       "eastquest_db",
  //       false,
  //       "no-encryption",
  //       1,
  //       false
  //     );

  //     if (!this.db) {
  //       throw new Error("Failed to create database connection");
  //     }

  //     await this.db.open();
  //     this.initialized = true;

  //     // Ensure table creation
  //     await this.db.execute(`
  //       CREATE TABLE IF NOT EXISTS study_sessions (
  //         id INTEGER PRIMARY KEY AUTOINCREMENT,
  //         duration INTEGER NOT NULL,
  //         timestamp TEXT NOT NULL,
  //         synced INTEGER DEFAULT 0
  //       );
  //     `);
  //     console.log("✅ SQLite Database Initialized");
  //   } catch (error) {
  //     console.error("❌ SQLite Init Error:", error);
  //   }
  // }

  // async initDB() {
  //   try {
  //     if (this.initialized) return;

  //     // Initialize SQLite connection
  //     this.sqlite = new SQLiteConnection(CapacitorSQLite);

  //     // 🚀 Handle Web Platform for Jeep-SQLite
  //     if (Capacitor.getPlatform() === "web") {
  //       console.log("🌐 Running on Web - Setting up Jeep-SQLite");

  //       if (!customElements.get("jeep-sqlite")) {
  //         const jeepEl = document.createElement("jeep-sqlite");
  //         document.body.appendChild(jeepEl);
  //       }

  //       await customElements.whenDefined("jeep-sqlite");
  //       console.log("🔄 Jeep-SQLite defined");

  //       // Wait for Jeep-SQLite to be ready
  //       const jeepSqliteEl = document.querySelector("jeep-sqlite");
  //       if (jeepSqliteEl) {
  //         await jeepSqliteEl.componentOnReady();
  //         console.log("✅ Jeep-SQLite component ready");
  //       } else {
  //         throw new Error("❌ Jeep-SQLite element not found");
  //       }

  //       // Initialize Web Store
  //       await this.sqlite.initWebStore();
  //       console.log("✅ Web store initialized");
  //     }

  //     // 🚀 Create and Open SQLite Database Connection
  //     this.db = await this.sqlite.createConnection(
  //       "eastquest_db",
  //       false,
  //       "no-encryption",
  //       1,
  //       Capacitor.getPlatform() === "web" // Use WebStore mode for web
  //     );

  //     if (!this.db) {
  //       throw new Error("❌ Failed to create database connection");
  //     }

  //     await this.db.open();
  //     console.log("✅ Database connection opened");
  //     this.initialized = true;

  //     // 🚀 Create Table if Not Exists
  //     await this.db.execute(`
  //       CREATE TABLE IF NOT EXISTS study_sessions (
  //         id INTEGER PRIMARY KEY AUTOINCREMENT,
  //         duration INTEGER NOT NULL,
  //         timestamp TEXT NOT NULL,
  //         synced INTEGER DEFAULT 0
  //       );
  //     `);
  //     console.log("✅ SQLite Database Initialized");
  //   } catch (error) {
  //     console.error("❌ SQLite Init Error:", error);
  //   }
  // }
  async initDB() {
    try {
      if (this.initialized) return;

      // Initialize SQLite Connection
      this.sqlite = new SQLiteConnection(CapacitorSQLite);

      if (Capacitor.getPlatform() === "web") {
        console.log("🌐 Running on Web - Setting up Jeep-SQLite");

        // ✅ Ensure `jeep-sqlite` element is properly added
        if (!customElements.get("jeep-sqlite")) {
          const jeepEl = document.createElement("jeep-sqlite");
          document.body.appendChild(jeepEl);
        }

        await customElements.whenDefined("jeep-sqlite");
        console.log("🔄 Jeep-SQLite defined");

        // ✅ Ensure the component is fully loaded
        const jeepSqliteEl = document.querySelector("jeep-sqlite");
        if (!jeepSqliteEl) throw new Error("❌ Jeep-SQLite element not found");

        await jeepSqliteEl.componentOnReady();
        console.log("✅ Jeep-SQLite component ready");

        // ✅ Initialize the Web Store
        await this.sqlite.initWebStore();
        console.log("✅ Web store initialized");
      }

      // ✅ Create and Open SQLite Database Connection
      this.db = await this.sqlite.createConnection(
        "eastquest_db",
        false,
        "no-encryption",
        1,
        Capacitor.getPlatform() === "web" // Use WebStore mode for web
      );

      if (!this.db) {
        throw new Error("❌ Failed to create database connection");
      }

      await this.db.open();
      console.log("✅ Database connection opened");
      this.initialized = true;

      // ✅ Create Table if Not Exists
      await this.db.execute(`
        CREATE TABLE IF NOT EXISTS study_sessions (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          duration INTEGER NOT NULL,
          timestamp TEXT NOT NULL,
          synced INTEGER DEFAULT 0
        );
      `);
      console.log("✅ SQLite Database Initialized");
    } catch (error) {
      console.error("❌ SQLite Init Error:", error);
    }
  }
  async saveSession(duration: number): Promise<void> {
    await this.initDB();
    if (!this.db) {
      console.error("❌ Database not initialized");
      return;
    }

    const timestamp = new Date().toISOString();
    try {
      await this.db.run(
        `INSERT INTO study_sessions (duration, timestamp, synced) VALUES (?, ?, ?)`,
        [duration, timestamp, 0]
      );
      console.log("✅ Session saved:", { duration, timestamp });
    } catch (error) {
      console.error("❌ Error saving session:", error);
    }
  }

  async getSessions(): Promise<any[]> {
    await this.initDB();
    if (!this.db) {
      console.error("❌ Database not initialized");
      return [];
    }

    try {
      const res = await this.db.query("SELECT * FROM study_sessions");
      console.log("📋 Fetched sessions:", res.values);
      return res.values || [];
    } catch (error) {
      console.error("❌ Error fetching sessions:", error);
      return [];
    }
  }

  async getUnsyncedSessions(): Promise<any[]> {
    await this.initDB();
    if (!this.db) {
      console.error("❌ Database not initialized");
      return [];
    }

    try {
      const res = await this.db.query(
        "SELECT * FROM study_sessions WHERE synced = 0"
      );
      console.log("📋 Unsynced sessions:", res.values);
      return res.values || [];
    } catch (error) {
      console.error("❌ Error fetching unsynced sessions:", error);
      return [];
    }
  }

  async markAsSynced(ids: number[]): Promise<void> {
    await this.initDB();
    if (!this.db) {
      console.error("❌ Database not initialized");
      return;
    }

    try {
      const placeholders = ids.map(() => "?").join(", ");
      await this.db.run(
        `UPDATE study_sessions SET synced = 1 WHERE id IN (${placeholders})`,
        ids
      );
      console.log("✅ Marked as synced:", ids);
    } catch (error) {
      console.error("❌ Error marking sessions as synced:", error);
    }
  }
}

export const databaseService = new DatabaseService();
