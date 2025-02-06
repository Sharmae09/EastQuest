import type { CapacitorConfig } from "@capacitor/cli";

const config: CapacitorConfig = {
  appId: "com.eastquest.app",
  appName: "eastquest",
  webDir: ".output/public",
  server: {
    androidScheme: "https",
  },
};

export default config;
