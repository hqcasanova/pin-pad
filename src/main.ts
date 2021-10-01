import { createApp } from 'vue';
import App from './App.vue';
import { store } from './store';
import Vue3TouchEvents from "vue3-touch-events";

const app = createApp(App).use(Vue3TouchEvents).use(store).mount('#app');

// NOTE: Just for fun. If the app were to be turned into a plugin, this would have to be
// removed or refactored to avoid unexpected side-effects beyond the plugin itself.
app.$store.subscribe((mutation, state) => {
  document.body.classList.toggle('success', state.isValid);
  document.body.classList.toggle('error', !!state.failCount);
});