import { useStore } from '@/store';
import { ActionType } from '@/store/actions';
import {
  readonly,
  ref, Ref,
  computed, ComputedRef, 
  watch  
} from 'vue';

const store = useStore();
const isValidatingRef = ref<boolean>(false);
const codeLength = computed(() => store.state.code.length);

type UseValidation = {
  validateOnLength: (isValidateOnLength: boolean) => void,
  isValidating: Ref<boolean> | boolean
}

export default function (): UseValidation  {

  /**
   * Triggers validation and, if enabled, also clears the code automatically regardless of the validation result.
   * @param {boolean} isResetOnValidation - True if the pin code si to be reset once validation is done.
   */
  const validate = (isResetOnValidation: boolean) => {
    const validated = store.dispatch(ActionType.ValidatePin);    
    
    isValidatingRef.value = true;
    validated.finally(() => {
      if (isResetOnValidation) {
        store.dispatch(ActionType.ResetPin);
      }
      isValidatingRef.value = false;
    });
  }

  const validateOnLength = (isResetOnValidation = false) => {
    watch(codeLength, (length: number) => {
      if (length === store.state.validLength) {
        validate(isResetOnValidation);
      }
    });
  }

  return {
    validateOnLength,
    isValidating: readonly(isValidatingRef)
  }
}
