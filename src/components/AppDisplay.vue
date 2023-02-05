<template>
  <div class="app-display">
    <h2 
      class="app-display__item app-display__title"
      test="display-item title"
    >
      <template v-if="isFail">
        <strong class="app-display__status app-display__status--error">
          {{ isPinLocked ? 'LOCKED' : 'ERROR' }}
        </strong>
        {{ isPinLocked ? 'Keypad disabled' : 'Wrong PIN' }}
      </template>

      <template v-else-if="isSuccess">
        <strong class="app-display__status app-display__status--success">OK</strong>
        PIN verified
      </template>

      <template v-else>
        Enter your PIN code
      </template>
    </h2>

    <p 
      class="app-display__item app-display__feedback"
      test="display-item feedback"
    >
      <template v-if="isValidating">
        Checking...
      </template>
      
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
      class="app-display__item app-display__pin"
      :class="{
        'app-display__pin--error': isFail && !isValidating,
        'app-display__pin--loading': isValidating || isPinLocked
      }"
      test="display-item pin"
      :pin-length="validLength"
      :value="code"
    >
      <base-digit 
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

<style lang="scss" scoped>
@import "@/scss/variables.scss";
@import "@/scss/mixins.scss";

.app-display {
  text-align: center;

  &__item {
    margin: .5rem 0;
  }
}

.app-display__title {
  font-size: 1.7rem;
  font-weight: 500;
}

.app-display__status {
  font-weight: 700;

  &--success {
    color: $success-text;
  }

  &--error {
    color: $error-text;
  }
}

.app-display__pin {
  &--error {
    @include shake-animation($medium);
  }
  
  .base-digit {
    font-weight: 700;
    transition: all $short linear;
  }

  &--loading .base-digit {
    @include pulse-animation($long);

    &:nth-child(even) {
      animation-delay: $medium;
    }
  }
}
</style>
