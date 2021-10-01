import { useStore } from '@/store';
import { computed } from 'vue';
import { MutationType } from '@/store/mutations';

type UseUpdate = {
  pinUpdate: (value: string | number, isValidating: boolean) => void
}

export default function (): UseUpdate {
  const store = useStore();
  const isPinShort = computed(() => store.getters.isPinShort);
  
  /**
   * If a complete PIN had been validated, it clears the PIN on pressing the first key before
   * changing the PIN code. Otherwise, it just does the latter.
   * @param value - Value keyed in.
   * @param isValidating - True if the PIN code is still undergoing validation.
   */
  function pinUpdate (value: string | number, isValidating: boolean) {
    if (!isValidating && !isPinShort.value) {
      store.commit(MutationType.PinReset);
    }
    if (isPinShort.value) {
      store.commit(MutationType.PinUpdate, value);
    }
  }

  return {
    pinUpdate
  }
}