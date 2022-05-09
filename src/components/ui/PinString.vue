<template>
  <div class="pin-string" :class="{'loading': isLoading}">
    <template v-for="charPos in charPositions" :key="charPos">
      <span class="pin-string__item">
        <slot 
          :pinPos="charPos"
          :pinChar="value[charPos]" />
      </span>
    </template>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: "PinString",

  props: {
    pinLength: {
      type: Number,
      required: true
    },

    value: {
      type: String,
      default: ''
    },

    isLoading: {
      type: Boolean,
      default: false
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
@import "@/scss/variables.scss";

.pin-string__item {
  display: inline-flex;
  vertical-align: middle;
  font-weight: bold;

  .loading & {
    opacity: 1;
    animation: $long linear infinite alternate pulse;

    &:nth-child(even) {
      animation-delay: $medium;
    }

    @keyframes pulse {
      50% {
        opacity: .1;
      }
    }
  }
}
</style>
