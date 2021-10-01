<template>
  <div class="pin-code" :class="{'loading': isLoading}">
    <pin-char v-for="charPos in charPositions" 
      :key="charPos"
      :isVisible="charPos >= value.length - visibleFromLast" 
      :value="value[charPos]" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import PinChar from '@/components/ui/PinChar.vue';

export default defineComponent({
  name: "PinCode",
  
  components: {
    PinChar
  },

  props: {

    // Length of a valid PIN
    reqLength: {
      type: Number,
      required: true
    },

    // Number of characters from the right that remain visible
    visibleFromLast: {
      type: Number,
      default: 0
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
      return [...Array(this.reqLength).keys()];
    }
  }
});
</script>

<style lang="scss" scoped>
@import "@/scss/variables.scss";

.pin-char {
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