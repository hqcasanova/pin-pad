<template>
  <div class="app-keypad flex flex-wrap m-auto">
    <div
      class="app-keypad__item flex items-center justify-center flex-grow p-2 w-1/3"
      v-for="keyValue in keyValues"
      :key="keyValue"
    >
      <base-key 
        class="app-btn bg-primary-states text-black w-10 min-mobile-dims leading-10 rounded-full"
        :disabled="isDisabled" 
        :value="keyValue"
        :is-cancel-hold="isInputBlocked"
        :is-global-key-handler="true"
        @key-pressed="!isInputBlocked && pinUpdate($event)" 
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

    isInputBlocked: {
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
