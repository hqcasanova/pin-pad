<template>
  <span 
    class="base-digit"
    :class="{
      'base-digit--filled': isValue && !isVisible,
      'base-digit--borderless': isValue && isVisible,
      'base-digit--faded': isDisabled
    }"
  >
    {{ isVisible ? value : '' }}
  </span>
</template>

<script setup lang="ts">
import { computed } from 'vue';

export type Props = {
  value?: string,
  isVisible?: boolean,
  isDisabled?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  value: '',
  isVisible: true,
  isDisabled: false   
});

const isValue = computed(() => props.value.length);
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

  &--filled {
    background: currentColor
  }

  &--borderless {
    border-color: transparent;
  }

  &--faded {
    opacity: 6;
  }
}
</style>
