<template>
  <div class="app-keypad">
    <div
      v-for="keyValue in keyValues"
      :key="keyValue"
      class="app-keypad__item"
    >
      <base-key 
        class="btn btn--primary"
        :disabled="isDisabled" 
        :value="keyValue"
        :is-cancel-hold="isInputBlocked"
        :is-global-key-handler="true"
        @key-pressed="!isInputBlocked && pinUpdate($event)" 
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import BaseKey from '@/components/base/BaseKey.vue';
import useUpdate from '@/behaviours/useUpdate';

export type Props = {
  keyValues?: (string | number)[],
  isDisabled?: boolean,
  isInputBlocked?: boolean
}
const props = withDefaults(defineProps<Props>(), {
  keyValues: () => JSON.parse(process.env.VUE_APP_PIN_KEYS),
  isDisabled: false,
  isInputBlocked: false
});

const { pinUpdate } = useUpdate();
</script>

<style lang="scss" scoped>
.app-keypad {
  display: flex;
  flex-wrap: wrap;
  margin: auto;

  &__item {
    display: flex;
    align-items: center;
    justify-content: center;
    flex: 1 0 33.3333%;
    padding: .5em;
  }
}
</style>
