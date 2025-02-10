import type { CapacitorConfig } from "@capacitor/cli";

const config: CapacitorConfig = {
  appId: "com.eastquest.app",
  appName: "eastquest",
  webDir: ".output/public",
  server: {
    androidScheme: "https",
  },
  // bundledWebRuntime: false,
  plugins: {
    CapacitorSQLite: {
      // iosDatabaseLocation: "Library/CapacitorDatabase",
      webAssemblyPath: "assets/sqlite-wasm",
    },
  },
};

export default config;
