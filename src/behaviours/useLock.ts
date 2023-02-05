import { useStore } from '@/store';
import { ActionType } from '@/store/actions';
import { 
  readonly,
  ref, Ref,
  computed, ComputedRef, 
  watch  
} from 'vue';

const globalCountdown = ref<number>(0);

let intervalID: number | undefined;

/**
 * Sets up a timer for the countdown before unlock.
 * @param initTime - Start time in seconds.
 * @param countdown
 */
function setTimer(initTime: number, countdown: Ref<number>): void {
  countdown.value = initTime;

  intervalID = window.setInterval(() => {
    countdown.value--;
    if (countdown.value === 0) {
      clearInterval(intervalID);
      intervalID = 0;
    }
  }, 1000);
}

type UseLock = {
  timerOnFailcount: (isResetOnTimeout?: boolean) => void,
  unlockCountdown: Ref<number>,
  paddedCountdown: ComputedRef<string>,
  isPinLocked: ComputedRef<boolean>
};

export default function (store = useStore(), countdown = globalCountdown): UseLock  {
  const isLockedFailCount = computed(() => store.getters.isLockFailCount);
  const countdownDigits = store.state.lockTimeout.toString().length;
  
  // Components sharing this composable but instantiated later will force the cancelling of any pending intervals
  intervalID = undefined;

  // True once enough failed attempts made and until countdown ends.
  const isPinLocked = computed(() => {
    return isLockedFailCount.value && countdown.value > 0;
  });

  // Padds the countdown number with leading zeros until length equal to default time.
  const paddedCountdown = computed(() => {
    return countdown.value.toString().padStart(countdownDigits, '0');
  });
  
  // Optional watchers
  const timerOnFailcount = (isResetOnTimeout = false) => {
    watch(isLockedFailCount, (isLocked: boolean) => {
      if (isLocked && !intervalID) {
        setTimer(store.state.lockTimeout, countdown);
      }
    });

    if (isResetOnTimeout) {
      watch(countdown, (value: number) => {
        if (value === 0) {
          store.dispatch(ActionType.ResetPin);
        }
      });
    }
  }

  return {
    timerOnFailcount,
    unlockCountdown: readonly(countdown),
    paddedCountdown,
    isPinLocked
  }
}
