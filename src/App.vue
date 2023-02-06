<template>
  <app-display
    class="my-4 landscape:w-64 landscape:mr-2"
    :code="code" 
    :valid-length="validLength"
    :is-pin-locked="isPinLocked"
    :is-validating="isValidating" 
  />
  <app-keypad
    class="mt-4 max-w-xs"
    :is-disabled="isPinLocked"
    :is-input-blocked="isValidating" 
  />

  <a 
    class="fixed bottom-0 right-0 block py-2 px-3 text-primary hover:underline"
    rel="external" 
    target="_blank" 
    href="https://github.com/hqcasanova/pin-pad"
  >
    Source
  </a>
</template>

<script setup lang="ts">
import AppDisplay from '@/components/AppDisplay.vue';
import AppKeypad from '@/components/AppKeypad.vue';

import { useStore } from 'vuex';
import useValidation from '@/behaviours/useValidation';
import useLock from '@/behaviours/useLock';
import { computed, onMounted } from 'vue';

export type Props = {
  isResetOnTimeout?: boolean
}
const props = withDefaults(defineProps<Props>(), {
  isResetOnTimeout: true
});

const store = useStore();
const { validateOnLength, isValidating } = useValidation();
const { timerOnFailcount, isPinLocked } = useLock();
const code = computed(() => store.state.code);
const validLength = computed(() => store.state.validLength);

validateOnLength();
timerOnFailcount(props.isResetOnTimeout); 

onMounted(() => {
  const appEl = document.querySelector('.app__container');
  appEl?.classList.add('app__container--loaded');
});
</script>

<style lang="scss">
.app {
  $this: &;

  /* Loaded state */
  &--loaded {
    color: theme('colors.white');

    #{$this}__branding {
      color: theme('colors.white');;
    }

    #{$this}__logo {
      opacity: 1;
      animation: none;
    }

    #{$this}__container {
      opacity: 1;
      max-height: 100vh;
      color: theme('colors.white');
    }
  }

  /* Two-column landscape layout */
  &__container {
    @media (orientation: landscape) {
      display: flex;
      align-items: center;
    }
  }
}
</style>
