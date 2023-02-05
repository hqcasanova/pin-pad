<template>
  <div class="pin-row">
    <template 
      v-for="charPos in charPositions" 
      :key="charPos"
    >
      <slot 
        :pin-pos="charPos"
        :pin-digit="value[charPos]"
      />
    </template>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';

export type Props = {
  pinLength: number,
  value?: string
}
const props = withDefaults(defineProps<Props>(), {
  value: ''
});

const charPositions = computed(() => {
  const positions = [];
  let i = 0;

  for (i; i < props.pinLength; i++) {
    positions.push(i);
  }
  return positions;
});
</script>

<style lang="scss" scoped>
.pin-row {
  display: inline-flex;
}
</style>
