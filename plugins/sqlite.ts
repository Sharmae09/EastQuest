import { databaseService } from "~/services/sqlite";

export default defineNuxtPlugin(async () => {
  await databaseService.initDB();
});
