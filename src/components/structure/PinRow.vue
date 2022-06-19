<template>
  <div class="pin-row">
    <template 
      v-for="charPos in charPositions" 
      :key="charPos"
    >
      <slot 
        :pinPos="charPos"
        :pinDigit="value[charPos]"
      />
    </template>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: "PinRow",

  props: {
    pinLength: {
      type: Number,
      required: true
    },

    value: {
      type: String,
      default: ''
    }
  },

  computed: {
    charPositions() {
      const positions = [];
      let i = 0;

      for (i; i < this.pinLength; i++) {
        positions.push(i);
      }
      return positions;
    }
  }
});
</script>

<style lang="scss" scoped>
.pin-row {
  display: inline-flex;
}
</style>
