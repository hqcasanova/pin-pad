import { createApp } from 'vue';
import App from './App.vue';
import { store } from './store';
import Vue3TouchEvents from "vue3-touch-events";

const app = createApp(App).use(Vue3TouchEvents).use(store).mount('.app__container');

// NOTE: Just for fun. If the app were to be turned into a plugin, this would have to be
// removed or refactored to avoid unexpected side-effects beyond the plugin itself.
app.$store.subscribe((mutation, state) => {
  document.body.classList.toggle('app--success', state.failCount === 0);
  document.body.classList.toggle('app--error', state.failCount > 0);
});
