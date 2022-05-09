import { useStore } from '@/store';
import { 
  readonly,
  ref, Ref,
  computed, ComputedRef, 
  watch  
} from 'vue';

const countdown = ref<number>(0);
const store = useStore();
const isLockedFailCount = computed(() => store.getters.isLockFailCount);
const countdownDigits = store.state.lockTimeout.toString().length;

let intervalID: number;

/**
 * Sets up a timer for the countdown before unlock.
 * @param initTime - Start time in seconds.
 */
function setTimer(initTime: number): void {
  countdown.value = initTime;

  intervalID = setInterval(() => {
    countdown.value--;
    if (countdown.value === 0) {
      clearInterval(intervalID);
      intervalID = 0;
    }
  }, 1000);
}

type UseLock = {
  timerOnFailcount: () => void,
  unlockCountdown: Ref<number> | number,
  paddedCountdown: ComputedRef<string> | string,
  isPinLocked: ComputedRef<boolean> | boolean
}

export default function (): UseLock  {

  // True once enough failed attempts made and until countdown ends.
  const isPinLocked = computed(() => {
    return isLockedFailCount.value && countdown.value > 0;
  });

  // Padds the countdown number with leading zeros until length equal to default time.
  const paddedCountdown = computed(() => {
    return countdown.value.toString().padStart(countdownDigits, '0');
  });

  // Sets the timer going every time the failcount limit is hit.
  const timerOnFailcount = () => {
    watch(isLockedFailCount, (isLocked: boolean) => {
      if (isLocked && !intervalID) {
        setTimer(store.state.lockTimeout);
      }
    });
  }

  return {
    timerOnFailcount,
    unlockCountdown: readonly(countdown),
    paddedCountdown,
    isPinLocked
  }
}
