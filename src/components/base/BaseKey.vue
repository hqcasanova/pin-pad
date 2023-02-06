<template>
  <button
    ref="buttonEl"
    v-touch:hold="onHold"
    v-touch:release="onRelease"
    class="base-key"
    type="button"
    @keydown.enter.space="onRelease"
  >
    {{ value }}
  </button>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue';

export type Props = {
  value: string | number,
  pressInterval?: number,
  isCancelHold?: boolean,
  isGlobalKeyHandler?: boolean
}
export type Emits = {
  (e: 'key-pressed', keyValue: Props['value']): void
}

const props = withDefaults(defineProps<Props>(), {
  
  // Number of milliseconds between press events when handling a long key hold
  pressInterval: 100,

  // Used to cut off event streams on demand
  isCancelHold: false,

  // For capturing strokes of the corresponding keyboard key regardless of focus location
  isGlobalKeyHandler: false
});
const emit = defineEmits<Emits>();

const intervalID = ref<number>(0);
const buttonEl = ref<HTMLButtonElement | null>(null);

onMounted(() => {
  if (props.isGlobalKeyHandler) {
    document.addEventListener('keydown', onValueKey.bind(this));
  }
});

onUnmounted(() => {
  document.removeEventListener('keydown', onValueKey);
});

/**
 * After holding the key for long enough, a continuous stream of the key's value is emitted.
 * This stream can be cancelled externally.
 */
function onHold() {
  intervalID.value = window.setInterval(() => {
    if (props.isCancelHold) {
      clearInterval(intervalID.value);
      intervalID.value = 0;
    } else {
      emit('key-pressed', props.value);
    }
  }, props.pressInterval);
}

/**
 * On key press whithout holding, it emits the character. If it's the end of a long hold, it stops the value's stream.
 */
function onRelease() {
  if (intervalID.value) {
    clearInterval(intervalID.value);
    intervalID.value = 0;
  } else {
    emit('key-pressed', props.value);
  }
}

/** 
 * Programatically clicks on the button after pressing precisely the keyboard key this component represents.
 * @param event - DOM event for keyboard stroke.
 */
function onValueKey(event: KeyboardEvent) {
  if (event.key === props.value.toString() && !buttonEl.value?.disabled) {
    onRelease();
    buttonEl.value?.focus();
  }
}
</script>
