import { useStore } from '@/store';
import { ActionType } from '@/store/actions';
import {
  readonly,
  ref, Ref,
  computed, ComputedRef,
  watch
} from 'vue';

const isValidatingRef = ref<boolean>(false);

type UseValidation = {
  codeLength: ComputedRef<number>,
  validateOnLength: () => void,
  isValidating: Ref<boolean>
};

export default function (store = useStore()): UseValidation  {
  const codeLength = computed(() => store.state.code.length);

  const validate = () => {
    const validated = store.dispatch(ActionType.ValidatePin);    
    
    isValidatingRef.value = true;
    validated.finally(() => {
      isValidatingRef.value = false;
    });
  }

  // Optional watchers
  const validateOnLength = () => {
    watch(codeLength, (length: number) => {
      if (length === store.state.validLength) {
        validate();
      }
    });
  }

  return {
    codeLength,
    validateOnLength,
    isValidating: readonly(isValidatingRef)
  }
}
