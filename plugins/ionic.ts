import { defineNuxtPlugin } from "#app";
import { IonicVue } from "@ionic/vue";
import "@ionic/vue/css/core.css";
import "@ionic/vue/css/normalize.css";
import "@ionic/vue/css/structure.css";
import "@ionic/vue/css/typography.css";

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.use(IonicVue);
});
