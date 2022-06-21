<template>
  <div class="app-keypad">
    <div 
      v-for="keyValue in keyValues" 
      class="app-keypad__item"
      :key="keyValue"
    >
      <base-key 
        class="primary-btn"
        :disabled="isDisabled" 
        :value="keyValue"
        :isCancelHold="isBlockInput"
        :isGlobalKeyHandler="true"
        @key:pressed="!isBlockInput && pinUpdate($event)" 
      />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import BaseKey from '@/components/base/BaseKey.vue';

import useUpdate from '@/behaviours/useUpdate';

export default defineComponent({
  name: 'AppKeypad',

  components: {
    BaseKey
  },

  props: {
    keyValues: {
      type: Array,
      default() {
        return JSON.parse(process.env.VUE_APP_PIN_KEYS) as (string | number)[];
      }
    },

    isDisabled: {
      type: Boolean,
      default: false
    },

    isBlockInput: {
      type: Boolean,
      default: false
    }
  },

  setup() {
    const { pinUpdate } = useUpdate();

    return {
      pinUpdate
    }
  }
});
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
