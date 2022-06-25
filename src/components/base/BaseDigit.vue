<template>
  <span 
    class="base-digit inline-flex items-center justify-center select-none pointer-events-none"
    :class="{
      'base-digit--hollow border-current border-solid': !isValue || !isVisible,
      'base-digit--filled bg-current': isValue && !isVisible,
      'base-digit--borderless border-transparent': isValue && isVisible,
      'base-digit--faded opacity-60': isDisabled
    }"
  >
    {{ isVisible ? value : '' }}
  </span>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: "BaseDigit",

  props: {
    value: {
      type: String,
      default: ''
    },

    isVisible: {
      type: Boolean,
      default: true
    },

    isDisabled: {
      type: Boolean,
      default: false
    }
  },

  computed: {
    isValue() {
      return this.value.length;
    }
  }
});
</script>
