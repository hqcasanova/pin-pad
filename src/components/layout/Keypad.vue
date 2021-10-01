<template>
  <div class="keypad-layout">
    <div v-for="keyValue in keyValues" class="key-item"
      :key="keyValue">
      <key-button class="primary-btn"
        :disabled="isPinLocked" 
        :value="keyValue"
        :isCancelHold="isValidating"
        :isGlobalKeyHandler="true"
        @key:pressed="onKeyPressed" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import KeyButton from '@/components/ui/KeyButton.vue';
import useLock from '@/behaviours/useLock';
import useUpdate from '@/behaviours/useUpdate';
import useValidation from '@/behaviours/useValidation';

export default defineComponent({
  name: 'Keypad',

  components: {
    KeyButton
  },

  props: {
    keyValues: {
      type: Array,
      default() {
        return JSON.parse(process.env.VUE_APP_PIN_KEYS) as (string | number)[];
      }
    }
  },

  setup() {
    const { isPinLocked } = useLock();
    const { isValidating } = useValidation();
    const { pinUpdate } = useUpdate();

    return {
      isPinLocked,
      isValidating,
      pinUpdate
    }
  },

  methods: {
    onKeyPressed(value: string | number) {
      this.pinUpdate(value, this.isValidating as boolean);
    }
  }
});
</script>

<style lang="scss" scoped>
.keypad-layout {
  display: flex;
  flex-wrap: wrap;
  margin: auto;

  .key-item {
    display: flex;
    align-items: center;
    justify-content: center;
    flex: 1 0 33.3333%;
    padding: .5em;
  }
}
</style>