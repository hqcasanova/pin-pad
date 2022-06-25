<template>
  <div class="pin-row inline-flex">
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
