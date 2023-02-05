import { useStore } from '@/store';
import { computed } from 'vue';
import { ActionType } from '@/store/actions';

export type UseUpdate = {
  pinUpdate: (value: string | number) => void
};

export default function (store = useStore()): UseUpdate {
  const isPinShort = computed(() => store.getters.isPinShort);
  
  /**
   * It clears the PIN on pressing the first key after PIN completion. 
   * Otherwise, it changes the PIN accordingly.
   * @param value - Value keyed in.
   */
  function pinUpdate (value: string | number) {
    if (!isPinShort.value) {
      store.dispatch(ActionType.ClearPin);
    }
    store.dispatch(ActionType.UpdatePin, value);
  }

  return {
    pinUpdate
  }
}
