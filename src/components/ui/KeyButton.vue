<template>
  <button class="key-btn" type="button"
    @keydown.enter.space="onRelease"
    v-touch:hold="onHold"
    v-touch:release="onRelease">
    {{ value }}
  </button>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'KeyButton',

  props: {
    value: {
      type: [String, Number],
      required: true
    },

    // Number of milliseconds between press events when handling a long key hold
    pressInterval: {
      type: Number,
      default: 100
    },

    // Name for the press event to be emitted
    pressEvent: {
      type: String,
      default: 'key:pressed'
    },

    // Used to cut off event streams on demand
    isCancelHold: {
      type: Boolean,
      default: false
    },

    // For capturing strokes of the corresponding keyboard key regardless of focus location
    isGlobalKeyHandler: {
      type: Boolean,
      default: false
    }
  },

  data() {
    return {
      intervalID: 0 as number
    }
  },

  mounted() {
    if (this.isGlobalKeyHandler) {
      document.addEventListener('keydown', this.onValueKey.bind(this));
    }
  },

  unmounted() {
    document.removeEventListener('keydown', this.onValueKey);
  },

  methods: {

    /**
     * After holding the key for long enough, a continuous stream of the key's value is emitted.
     * This stream can be cancelled externally.
     */
    onHold() {
      this.intervalID = setInterval(() => {
        if (this.isCancelHold) {
          clearInterval(this.intervalID);
          this.intervalID = 0;
        } else {
          this.$emit(this.pressEvent, this.value);
        }
      }, this.pressInterval);
    },

    /**
     * On key press whithout holding, it emits the character. If it's the end of a long hold, it stops the value's stream.
     */
    onRelease() {
      if (this.intervalID) {
        clearInterval(this.intervalID);
        this.intervalID = 0;
      } else {
        this.$emit(this.pressEvent, this.value);
      }
    },

    /** 
     * Programatically clicks on the button after pressing precisely the keyboard key this component represents.
     * @param event - DOM event for keyboard stroke.
     */
    onValueKey(event: KeyboardEvent) {
      if (event.key === this.value.toString() && !this.$el.disabled) {
        this.onRelease();
        this.$el.focus();
      }
    }
  }
});
</script>

<style lang="scss" scoped>
.key-btn {
  padding: 0;
  width: 2.5em;
  min-width: 42px;
  min-height: 42px;
  line-height: 2.5em;
  border-radius: 50%;
}
</style>
