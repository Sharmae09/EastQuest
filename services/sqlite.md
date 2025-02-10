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
//     if (this.initialized) return;

//     try {
//       if (Capacitor.getPlatform() === "web") {
//         console.log("🌐 Running on Web - Setting up Jeep-SQLite");

//         if (!customElements.get("jeep-sqlite")) {
//           const jeepEl = document.createElement("jeep-sqlite");
//           document.body.appendChild(jeepEl);
//         }
//         await customElements.whenDefined("jeep-sqlite");
//         const jeepSqliteEl = document.querySelector("jeep-sqlite");
//         if (!jeepSqliteEl) throw new Error("❌ Jeep-SQLite element not found");
//         await jeepSqliteEl.componentOnReady();
//         await this.sqlite.initWebStore();
//         console.log("✅ Web store initialized");
//       }

//       this.db = await this.sqlite.createConnection(
//         "eastquest_db",
//         false,
//         "no-encryption",
//         1,
//         Capacitor.getPlatform() === "web"
//       );

//       if (!this.db) throw new Error("❌ Failed to create database connection");

//       await this.db.open();
//       this.initialized = true;

//       // ✅ Create Tables
//       await this.db.execute(`
//         CREATE TABLE IF NOT EXISTS study_sessions (
//           id INTEGER PRIMARY KEY AUTOINCREMENT,
//           duration INTEGER NOT NULL,
//           timestamp TEXT NOT NULL,
//           synced INTEGER DEFAULT 0
//         );
//       `);

//       console.log("✅ SQLite Database Initialized");
//     } catch (error) {
//       console.error("❌ SQLite Init Error:", error);
//     }
//   }

//   async insertSession(duration: number): Promise<void> {
//     await this.initDB();
//     if (!this.db) return;

//     const timestamp = new Date().toISOString();
//     try {
//       await this.db.run(
//         `INSERT INTO study_sessions (duration, timestamp, synced) VALUES (?, ?, ?)`,
//         [duration, timestamp, 0]
//       );
//       console.log("✅ Session saved:", { duration, timestamp });
//     } catch (error) {
//       console.error("❌ Error saving session:", error);
//     }
//   }

//   async getSessions(): Promise<any[]> {
//     await this.initDB();
//     if (!this.db) return [];

//     try {
//       const res = await this.db.query("SELECT * FROM study_sessions");
//       return res.values || [];
//     } catch (error) {
//       console.error("❌ Error fetching sessions:", error);
//       return [];
//     }
//   }

//   async closeDB() {
//     if (this.db) {
//       await this.db.close();
//       await this.sqlite.closeConnection("eastquest_db");
//       this.db = null;
//       console.log("✅ Database closed");
//     }
//   }
// }

// export const databaseService = new DatabaseService();

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
//       if (this.initialized) return;
//       // Initialize SQLite Connection
//       this.sqlite = new SQLiteConnection(CapacitorSQLite);
//       if (Capacitor.getPlatform() === "web") {
//         console.log("🌐 Running on Web - Setting up Jeep-SQLite");
//         // ✅ Ensure `jeep-sqlite` element is properly added
//         if (!customElements.get("jeep-sqlite")) {
//           const jeepEl = document.createElement("jeep-sqlite");
//           document.body.appendChild(jeepEl);
//         }
//         await customElements.whenDefined("jeep-sqlite");
//         console.log("🔄 Jeep-SQLite defined");
//         // ✅ Ensure the component is fully loaded
//         const jeepSqliteEl = document.querySelector("jeep-sqlite");
//         if (!jeepSqliteEl) throw new Error("❌ Jeep-SQLite element not found");
//         await jeepSqliteEl.componentOnReady();
//         console.log("✅ Jeep-SQLite component ready");
//         // ✅ Initialize the Web Store
//         await this.sqlite.initWebStore();
//         console.log("✅ Web store initialized");
//       }
//       // ✅ Create and Open SQLite Database Connection
//       this.db = await this.sqlite.createConnection(
//         "eastquest_db",
//         false,
//         "no-encryption",
//         1,
//         Capacitor.getPlatform() === "web" // Use WebStore mode for web
//       );
//       if (!this.db) {
//         throw new Error("❌ Failed to create database connection");
//       }
//       await this.db.open();
//       console.log("✅ Database connection opened");
//       this.initialized = true;
//       // ✅ Create Table if Not Exists
//       await this.db.execute(`
//         CREATE TABLE IF NOT EXISTS study_sessions (
//           id INTEGER PRIMARY KEY AUTOINCREMENT,
//           duration INTEGER NOT NULL,
//           timestamp TEXT NOT NULL,
//           synced INTEGER DEFAULT 0
//         );
//       `);
//       console.log("✅ SQLite Database Initialized");
//     } catch (error) {
//       console.error("❌ SQLite Init Error:", error);
//     }
//   }
//   async saveSession(duration: number): Promise<void> {
//     await this.initDB();
//     if (!this.db) {
//       console.error("❌ Database not initialized");
//       return;
//     }

//     const timestamp = new Date().toISOString();
//     try {
//       await this.db.run(
//         `INSERT INTO study_sessions (duration, timestamp, synced) VALUES (?, ?, ?)`,
//         [duration, timestamp, 0]
//       );
//       console.log("✅ Session saved:", { duration, timestamp });
//     } catch (error) {
//       console.error("❌ Error saving session:", error);
//     }
//   }

//   async getSessions(): Promise<any[]> {
//     await this.initDB();
//     if (!this.db) {
//       console.error("❌ Database not initialized");
//       return [];
//     }

//     try {
//       const res = await this.db.query("SELECT * FROM study_sessions");
//       console.log("📋 Fetched sessions:", res.values);
//       return res.values || [];
//     } catch (error) {
//       console.error("❌ Error fetching sessions:", error);
//       return [];
//     }
//   }

//   async getUnsyncedSessions(): Promise<any[]> {
//     await this.initDB();
//     if (!this.db) {
//       console.error("❌ Database not initialized");
//       return [];
//     }

//     try {
//       const res = await this.db.query(
//         "SELECT * FROM study_sessions WHERE synced = 0"
//       );
//       console.log("📋 Unsynced sessions:", res.values);
//       return res.values || [];
//     } catch (error) {
//       console.error("❌ Error fetching unsynced sessions:", error);
//       return [];
//     }
//   }

//   async markAsSynced(ids: number[]): Promise<void> {
//     await this.initDB();
//     if (!this.db) {
//       console.error("❌ Database not initialized");
//       return;
//     }

//     try {
//       const placeholders = ids.map(() => "?").join(", ");
//       await this.db.run(
//         `UPDATE study_sessions SET synced = 1 WHERE id IN (${placeholders})`,
//         ids
//       );
//       console.log("✅ Marked as synced:", ids);
//     } catch (error) {
//       console.error("❌ Error marking sessions as synced:", error);
//     }
//   }
// }

// export const databaseService = new DatabaseService();

// import { Capacitor } from "@capacitor/core";
// import {
//   CapacitorSQLite,
//   SQLiteConnection,
//   SQLiteDBConnection,
// } from "@capacitor-community/sqlite";

// class DatabaseService {
//   private sqlite = new SQLiteConnection(CapacitorSQLite);
//   private db: SQLiteDBConnection | null = null;
//   private initialized = false;

//   async initDB() {
//     try {
//       if (this.initialized) return;

//       console.log("🛠️ Initializing SQLite...");
//       this.sqlite = new SQLiteConnection(CapacitorSQLite);

//       if (Capacitor.getPlatform() === "web") {
//         console.log("🌐 Running on Web - Setting up Jeep-SQLite");

//         // ✅ Ensure `jeep-sqlite` is properly registered
//         await customElements.whenDefined("jeep-sqlite");
//         console.log("🔄 Jeep-SQLite defined");

//         // ✅ Ensure the component is fully loaded
//         const jeepSqliteEl = document.querySelector("jeep-sqlite");
//         if (!jeepSqliteEl) throw new Error("❌ Jeep-SQLite element not found");
//         await jeepSqliteEl.componentOnReady();
//         console.log("✅ Jeep-SQLite component ready");

//         // ✅ Initialize Web Store
//         await this.sqlite.initWebStore();
//         console.log("✅ Web store initialized");
//       }

//       // ✅ Create and Open SQLite Database Connection
//       this.db = await this.sqlite.createConnection(
//         "eastquest_db",
//         false,
//         "no-encryption",
//         1,
//         Capacitor.getPlatform() === "web"
//       );
//       if (!this.db) {
//         throw new Error("❌ Failed to create database connection");
//       }
//       await this.db.open();
//       console.log("✅ Database connection opened");
//       this.initialized = true;

//       // ✅ Create Table if Not Exists
//       await this.db.execute(`
//         CREATE TABLE IF NOT EXISTS study_sessions (
//           id INTEGER PRIMARY KEY AUTOINCREMENT,
//           duration INTEGER NOT NULL,
//           timestamp TEXT NOT NULL,
//           synced INTEGER DEFAULT 0
//         );
//       `);
//       console.log("✅ SQLite Database Initialized");
//     } catch (error) {
//       console.error("❌ SQLite Init Error:", error);
//     }
//   }
// }

// export const databaseService = new DatabaseService();

// import { Capacitor } from "@capacitor/core";
// import {
//   CapacitorSQLite,
//   SQLiteConnection,
//   SQLiteDBConnection,
// } from "@capacitor-community/sqlite";

// class DatabaseService {
//   private sqlite = new SQLiteConnection(CapacitorSQLite);
//   private db: SQLiteDBConnection | null = null;
//   private initialized = false;

//   async initDB() {
//     try {
//       if (this.initialized) return;

//       console.log("🛠️ Initializing SQLite...");
//       this.sqlite = new SQLiteConnection(CapacitorSQLite);

//       if (process.client && Capacitor.getPlatform() === "web") {
//         console.log("🌐 Running on Web - Setting up Jeep-SQLite");

//         // ✅ Ensure `jeep-sqlite` is properly registered before initializing
//         await customElements.whenDefined("jeep-sqlite");
//         console.log("🔄 Jeep-SQLite Web Component Ready");

//         // ✅ Ensure the component is fully loaded
//         const jeepSqliteEl = document.querySelector("jeep-sqlite");
//         if (!jeepSqliteEl) throw new Error("❌ Jeep-SQLite element not found");
//         await jeepSqliteEl.componentOnReady();

//         // ✅ Initialize Web Store
//         await this.sqlite.initWebStore();
//         console.log("✅ Web store initialized");
//       }

//       // ✅ Create and Open SQLite Database Connection
//       this.db = await this.sqlite.createConnection(
//         "eastquest_db",
//         false,
//         "no-encryption",
//         1,
//         Capacitor.getPlatform() === "web"
//       );
//       if (!this.db) {
//         throw new Error("❌ Failed to create database connection");
//       }
//       await this.db.open();
//       console.log("✅ Database connection opened");
//       this.initialized = true;

//       // ✅ Create Table if Not Exists
//       await this.db.execute(`
//         CREATE TABLE IF NOT EXISTS study_sessions (
//           id INTEGER PRIMARY KEY AUTOINCREMENT,
//           duration INTEGER NOT NULL,
//           timestamp TEXT NOT NULL,
//           synced INTEGER DEFAULT 0
//         );
//       `);
//       console.log("✅ SQLite Database Initialized");
//     } catch (error) {
//       console.error("❌ SQLite Init Error:", error);
//     }
//   }
// }

// export const databaseService = new DatabaseService();
import { Capacitor } from "@capacitor/core";
import {
  CapacitorSQLite,
  SQLiteConnection,
  SQLiteDBConnection,
} from "@capacitor-community/sqlite";

class DatabaseService {
  private sqlite = new SQLiteConnection(CapacitorSQLite);
  private db: SQLiteDBConnection | null = null;
  private initialized = false;

  async initDB() {
    try {
      if (this.initialized) return;

      console.log("🛠️ Initializing SQLite...");
      this.sqlite = new SQLiteConnection(CapacitorSQLite);

      if (process.client && Capacitor.getPlatform() === "web") {
        console.log("🌐 Running on Web - Setting up Jeep-SQLite");

        // ✅ Ensure `jeep-sqlite` is registered
        await customElements.whenDefined("jeep-sqlite");
        console.log("🔄 Jeep-SQLite Web Component Ready");

        const jeepSqliteEl = document.querySelector("jeep-sqlite");
        if (!jeepSqliteEl) throw new Error("❌ Jeep-SQLite element not found");
        await jeepSqliteEl.componentOnReady();

        // ✅ Initialize Web Store
        await this.sqlite.initWebStore();
        console.log("✅ Web store initialized");
      }

      // ✅ Create and Open Database
      this.db = await this.sqlite.createConnection(
        "nuxt_db",
        false,
        "no-encryption",
        1,
        Capacitor.getPlatform() === "web"
      );

      await this.db.open();
      console.log("✅ Database connection opened");
      this.initialized = true;

      // ✅ Create Table if Not Exists
      await this.db.execute(`
        CREATE TABLE IF NOT EXISTS study_sessions (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          duration INTEGER NOT NULL,
          timestamp TEXT NOT NULL
        );
      `);
      console.log("✅ SQLite Database Initialized");
    } catch (error) {
      console.error("❌ SQLite Init Error:", error);
    }
  }

  async addSession(duration: number) {
    await this.initDB();
    if (!this.db) return;

    const timestamp = new Date().toISOString();
    await this.db.run(
      `INSERT INTO study_sessions (duration, timestamp) VALUES (?, ?)`,
      [duration, timestamp]
    );
    console.log("✅ Session saved:", { duration, timestamp });
  }

  async getSessions() {
    await this.initDB();
    if (!this.db) return [];

    const res = await this.db.query("SELECT * FROM study_sessions");
    return res.values || [];
  }
}

export const databaseService = new DatabaseService();
