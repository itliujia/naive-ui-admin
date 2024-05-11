import type { App } from "vue";
import { createPinia } from "pinia";
const store = createPinia();

/** 启用 Pinia */
export function setupStore(app: App<Element>) {
  app.use(store);
}

export { store };
