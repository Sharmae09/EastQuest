<template>
  <div>
    <!-- <jeep-sqlite></jeep-sqlite> -->
    <NuxtLayout />
  </div>
</template>
<script>

import { onMounted } from "vue";
import { useDatabase } from "./utils/sqlite";

onMounted(async () => {
  const db = await useDatabase();

  if (db) {
    await db.run("INSERT INTO users (name) VALUES (?)", ["John Doe"]);
    const result = await db.query("SELECT * FROM users");
    console.log("Users:", result);
  }
});
</script>
