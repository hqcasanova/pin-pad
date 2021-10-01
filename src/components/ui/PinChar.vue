<template>
  <span class="pin-char"
    :class="{
      'fill': isValue && !isVisible,
      'hide-border': isValue && isVisible,
      'faded': isDisabled
    }">
    {{ value }}
  </span>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: "PinChar",

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
@import "@/scss/variables.scss";
  
.pin-char {
  display: inline-flex;
  align-items: center; 
  justify-content: center;
  margin: .5em;
  width: 1em;
  height: 1em;
  border: .15em solid $white;
  border-radius: 50%;
  transition: all $short linear;
  user-select: none;
  pointer-events: none;

  &.fill {
    background: $white;
  }

  &.hide-border {
    border-color: transparent;
  }

  &.faded {
    opacity: 6;
  }
}
</style>