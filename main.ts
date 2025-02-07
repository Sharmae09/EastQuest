import { defineCustomElements } from "jeep-sqlite/loader";

// Ensure custom elements are defined
if (typeof customElements !== "undefined") {
  defineCustomElements(window);
}
