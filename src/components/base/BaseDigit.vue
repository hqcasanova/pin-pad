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
