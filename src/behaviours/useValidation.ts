import { useStore } from '@/store';
import { MutationType } from '@/store/mutations';
import { ActionType } from '@/store/actions';
import {
  readonly,
  ref, Ref,
  computed, ComputedRef, 
  watch  
} from 'vue';

const isValidatingRef = ref<boolean>(false);

// Flexible typing to allow for mocking if necessary
type UseValidation = {
  isFail: ComputedRef<boolean> | boolean,
  isSuccess: ComputedRef<boolean> | boolean,
  isValidating: Ref<boolean> | boolean
}

export default function (isValidateOnLength= false, isResetOnValidation = false): UseValidation  {
  const store = useStore();
  const codeLength = computed(() => store.state.code.length);

  /**
   * Triggers validation as soon as the PIN code is of the required length. If enabled,
   * it also clears the code automatically, regardless of the validation result.
   */
  watch(codeLength, (length: number) => {
    let validated;

    if (isValidateOnLength && length === store.state.maxLength) {
      isValidatingRef.value = true;
      validated = store.dispatch(ActionType.ValidatePin);
      
      validated.finally(() => {
        if (isResetOnValidation) {
          store.commit(MutationType.PinReset);
        }
        isValidatingRef.value = false;
      });
    }
  });

  return {
    isFail: computed(() => store.state.failCount > 0),
    isSuccess: computed(() => store.state.isValid && !store.state.failCount),
    isValidating: readonly(isValidatingRef)
  }
}