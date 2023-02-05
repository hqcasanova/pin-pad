import useValidation from '@/behaviours/useValidation';
import { ActionType } from '@/store/actions';
import { state, State } from '@/store/state';
import { mount, VueWrapper } from '@vue/test-utils';
import { DefineComponent, defineComponent } from 'vue';
import { createStore, Store } from 'vuex';

describe('useValidation', () => {
  let mockStore: Store<State>;
  let wrapper: VueWrapper<any>;
  let TestComponent: DefineComponent<any>; 
  let mockDispatch: jest.SpyInstance;

  beforeEach(() => {
    mockStore = createStore({
      state: {
        ...state,
        code: '',
        validLength: 4
      }
    });
    mockDispatch = jest.spyOn(mockStore, 'dispatch');
    
    TestComponent = defineComponent({
      template: '<span />',
      setup() { 
        const { validateOnLength, isValidating, codeLength } = useValidation(mockStore);
        validateOnLength();
        return { isValidating, codeLength };
      }
    });
    wrapper = mount(TestComponent);
  });
  
  afterEach(() => {
    jest.clearAllMocks();
    wrapper.unmount();
  });

  describe('codeLength', () => {
    it('returns a number', () => {
      expect(typeof useValidation(mockStore).codeLength.value).toBe('number');
    });

    it('reflects the length of the current pin code', async () => {
      mockStore.state.code = '12';
      await wrapper.vm.$nextTick();

      expect(wrapper.vm.codeLength).toBe(2);
    });
  });
  

  describe('validateOnLength', () => {
    it('returns a function', () => {
      expect(useValidation(mockStore).validateOnLength).toBeInstanceOf(Function);
    });

    it('triggers validation if pin code is the required length', async () => {
      mockDispatch.mockResolvedValue('');
      
      mockStore.state.code = '1234';
      await wrapper.vm.$nextTick();
      
      expect(mockDispatch).toHaveBeenCalledWith(ActionType.ValidatePin);
    });
  });

  describe('isValidating', () => {
    it('returns a boolean', () => {
      expect(typeof useValidation(mockStore).isValidating.value).toBe('boolean');
    });

    it('false before and after the validation', async () => {
      expect(wrapper.vm.isValidating).toBe(false);

      mockDispatch.mockResolvedValue('');
      mockStore.state.code = '1234';
      await wrapper.vm.$nextTick();
      
      expect(wrapper.vm.isValidating).toBe(false);
    });

    it('true during the validation', async () => {
      mockDispatch.mockImplementationOnce(
        () => new Promise(() => {})
      );

      mockStore.state.code = '1234';
      await wrapper.vm.$nextTick();
      
      expect(wrapper.vm.isValidating).toBe(true);
    });
  });
});