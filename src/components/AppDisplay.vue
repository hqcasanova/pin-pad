<template>
  <div class="app-display text-center">
    <h2 class="app-display__item app-display__title my-2 text-3xl font-medium">
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

    <p class="app-display__item app-display__feedback my-2">
      <template v-if="isValidating">Checking...</template>
      
      <template v-else-if="isFail && !isPinLocked">
        {{ isLastAttempt ? 'Last try remaining' : 'Please try again' }}
      </template>

      <template v-else-if="isFail && isPinLocked">
        Please wait {{ paddedCountdown }} seconds
      </template>

      <template v-else-if="isSuccess">Your PIN is valid</template>

      <template v-else>The code must be {{ validLength }} characters long</template>
    </p>

    <pin-row 
      class="app-display__item app-display__pin my-2"
      :class="{
        'app-display__pin--error animate-shake': isFail && !isValidating,
        'app-display__pin--loading': isValidating || isPinLocked
      }"
      :pin-length="validLength"
      :value="code"
      v-slot="slotProps"
    >
      <base-digit
        class="m-2 w-4 h-4 font-bold border-2 transition-all rounded-full"
        :is-visible="isCharVisible(slotProps.pinPos)" 
        :value="slotProps.pinDigit" 
      />
    </pin-row>
  </div>
</template>

display: inline-flex;
  align-items: center; 
  justify-content: center;
  margin: .5em;
  width: 1em;
  height: 1em;
  border: .15em solid currentColor;
  

<script lang="ts">
import { defineComponent } from 'vue';
import PinRow from '@/components/structure/PinRow.vue';
import BaseDigit from '@/components/base/BaseDigit.vue';

import { mapGetters } from 'vuex';
import useLock from '@/behaviours/useLock';

export default defineComponent({
  name: 'AppDisplay',

  components: { 
    PinRow,
    BaseDigit
  },

  props: {
    code: {
      type: String,
      required: true
    },
    
    validLength: {
      type: Number,
      required: true
    },

    // Number of characters from the right that remain visible
    visibleFromLast: {
      type: Number,
      default: JSON.parse(process.env.VUE_APP_PIN_SHOW_LAST) | 0
    },

    isPinLocked: {
      type: Boolean,
      default: false
    },

    isValidating: {
      type: Boolean,
      default: false
    }
  },

  computed: {
    ...mapGetters(['isLastAttempt', 'isFail', 'isSuccess'])
  },

  setup() {
    const { paddedCountdown } = useLock();

    return {
      paddedCountdown,
    }
  },

  methods: {
    isCharVisible(charPos: number) {
      return charPos >= this.code.length - this.visibleFromLast;
    }
  }
});
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
