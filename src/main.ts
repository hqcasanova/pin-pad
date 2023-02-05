import { createApp } from 'vue';
import App from './App.vue';
import { store } from './store';
import { State } from './store/state';
import Vue3TouchEvents from "vue3-touch-events";
import { MutationPayload } from 'vuex';

createApp(App).use(Vue3TouchEvents).use(store).mount('.app__container');

// NOTE: Just for fun. If the app were to be turned into a plugin, this would have to be
// removed or refactored to avoid unexpected side-effects beyond the plugin itself.
store.subscribe((mutation: MutationPayload, state: State) => {
  document.body.classList.toggle('app--success', state.failCount === 0);
  document.body.classList.toggle('app--error', state.failCount > 0);
});
