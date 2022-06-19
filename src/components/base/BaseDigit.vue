<template>
  <span class="base-digit"
    :class="{
      'fill': isValue && !isVisible,
      'hide-border': isValue && isVisible,
      'faded': isDisabled
    }">
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

<style lang="scss" scoped>  
.base-digit {
  display: inline-flex;
  align-items: center; 
  justify-content: center;
  margin: .5em;
  width: 1em;
  height: 1em;
  border: .15em solid currentColor;
  border-radius: 50%;
  user-select: none;
  pointer-events: none;

  &.fill {
    background: currentColor
  }

  &.hide-border {
    border-color: transparent;
  }

  &.faded {
    opacity: 6;
  }
}
</style>
