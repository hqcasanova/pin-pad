<template>
  <div class="app-display text-center">
    <h2 
      class="app-display__item app-display__title my-2 text-3xl font-medium"
      test="display-item title">
      <template v-if="isFail">
        <strong class="app-display__status text-error">
          {{ isPinLocked ? 'LOCKED' : 'ERROR' }}
        </strong>
        {{ isPinLocked ? 'Keypad disabled' : 'Wrong PIN' }}
      </template>

      <template v-else-if="isSuccess">
        <strong class="app-display__status text-success">OK</strong>
        PIN verified
      </template>

      <template v-else>
        Enter your PIN code
      </template>
    </h2>

    <p 
      class="app-display__item app-display__feedback my-2"
      test="display-item feedback"
    >
      <template v-if="isValidating">Checking...</template>
      
      <template v-else-if="isFail && !isPinLocked">
        {{ isLastAttempt ? 'Last try remaining' : 'Please try again' }}
      </template>

      <template v-else-if="isFail && isPinLocked">
        Please wait {{ paddedCountdown }} seconds
      </template>

      <template v-else-if="isSuccess">
        Your PIN is valid
      </template>

      <template v-else>
        The code must be {{ validLength }} characters long
      </template>
    </p>

    <pin-row
      v-slot="slotProps"
      class="app-display__item app-display__pin my-2"
      :class="{
        'app-display__pin--error animate-shake': isFail && !isValidating,
        'app-display__pin--loading': isValidating || isPinLocked
      }"
      test="display-item pin"
      :pin-length="validLength"
      :value="code"
    >
      <base-digit
        class="m-2 w-4 h-4 font-bold border-2 transition-all rounded-full"
        :is-visible="isCharVisible(slotProps.pinPos)" 
        :value="slotProps.pinDigit" 
      />
    </pin-row>
  </div>
</template>

<script setup lang="ts">
import PinRow from '@/components/structure/PinRow.vue';
import BaseDigit from '@/components/base/BaseDigit.vue';

import { useStore } from 'vuex';
import useLock from '@/behaviours/useLock';
import { computed } from 'vue';

export type Props = {
  code: string,
  validLength: number,
  visibleFromLast?: number,
  isPinLocked?: boolean,
  isValidating?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  visibleFromLast: JSON.parse(process.env.VUE_APP_PIN_SHOW_LAST),
  isPinLocked: false,
  isValidating: false
});

const store = useStore();  
const { paddedCountdown } = useLock();

const isLastAttempt = computed(() => store.getters.isLastAttempt);
const isFail = computed(() => store.getters.isFail);
const isSuccess = computed(() => store.getters.isSuccess);

function isCharVisible(charPos: number) {
  return charPos >= props.code.length - (props.visibleFromLast || 0);
}
</script>

<style scoped>
.app-display__pin--loading .base-digit {
  @apply animate-pulse
}

/* There is no animation-delay utility class in Tailwind v2 */
/* It seems only native utility classes are customisable variant-wise in the tailwind.config.js file */
.app-display__pin--loading .base-digit:nth-child(even) {
  animation-delay: theme('transitionDuration.500');
}
</style>
