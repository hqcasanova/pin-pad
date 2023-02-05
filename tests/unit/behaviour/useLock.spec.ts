import useLock from '@/behaviours/useLock';
import { ActionType } from '@/store/actions';
import { state, State } from '@/store/state';
import { mount, VueWrapper } from '@vue/test-utils';
import { defineComponent, Ref, ref } from 'vue';
import { createStore, Store } from 'vuex';

describe('useLock', () => {
  let mockStore: Store<State>;
  let wrapper: VueWrapper<any>;
  let mockDispatch: jest.SpyInstance;
  let countdownRef: Ref<number>;

  const createWrapper = (store: Store<State>, isResetOnTimeout: boolean = true) => {
    const TestComponent = defineComponent({
      template: '<span />',
      setup() { 
        const {
          timerOnFailcount,
          unlockCountdown,
          paddedCountdown,
          isPinLocked
        } = useLock(store, countdownRef);

        timerOnFailcount(isResetOnTimeout);
        return { unlockCountdown, paddedCountdown, isPinLocked };
      }
    });

    return mount(TestComponent);
  };

  beforeEach(() => {
    countdownRef = ref<number>(0);

    mockStore = createStore({
      state: {
        ...state,
        lockTimeout: 5,
        failCount: 0
      },
      getters: { isLockFailCount: (state) => !!state.failCount },
      actions: { [ActionType.ResetPin]: jest.fn() }
    });
    mockDispatch = jest.spyOn(mockStore, 'dispatch');
  });
  
  afterEach(() => {
    jest.clearAllMocks();
    wrapper.unmount();
  });

  describe('timerOnFailCount', () => {
    
    it('returns a function', () => {
      wrapper = createWrapper(mockStore);

      expect(useLock(mockStore).timerOnFailcount).toBeInstanceOf(Function);
    });

    it('triggers countdown if the fail count threshold for locking has been reached', async () => {
      wrapper = createWrapper(mockStore);
      
      mockStore.state.failCount = 1;
      await wrapper.vm.$nextTick();
      
      expect(countdownRef.value).toBe(mockStore.state.lockTimeout);
    });

    it('triggers pin reset once locking has timed out', async () => {
      wrapper = createWrapper(mockStore);

      countdownRef.value = 1;
      await wrapper.vm.$nextTick();
      countdownRef.value = 0;
      await wrapper.vm.$nextTick();
    
      expect(mockDispatch).toHaveBeenCalledWith(ActionType.ResetPin);
    });

    describe('Pin resetting after lock disabled', () => {
      it('does not reset the pin code after locking has timed out', async () => {
        wrapper = createWrapper(mockStore, false);

        countdownRef.value = 1;
        await wrapper.vm.$nextTick();
        countdownRef.value = 0;
        await wrapper.vm.$nextTick();
    
        expect(mockDispatch).not.toHaveBeenCalled();
      });

      it('still triggers countdown after fail threshold reached', async () => {
        wrapper = createWrapper(mockStore, false);
        
        mockStore.state.failCount = 1;
        await wrapper.vm.$nextTick();
        
        expect(countdownRef.value).toBe(mockStore.state.lockTimeout);
      });
    });
  });

  describe('unlockCountdown', () => {
    it('returns 0 initially', () => {
      expect(useLock(mockStore).unlockCountdown.value).toBe(0);
    });

    it('is different from zero once the countdown is under way', async () => {
      wrapper = createWrapper(mockStore);

      mockStore.state.failCount = 1;
      await wrapper.vm.$nextTick();

      expect(wrapper.vm.unlockCountdown).not.toBe(0);
    });
  });

  describe('paddedCountdown', () => {
    it('returns initially a string of 0s with as many positions as the lockTimeout', () => {
      mockStore.state.lockTimeout = 100;
      const digitLength = `${mockStore.state.lockTimeout}`.length;
      const regex = new RegExp(`^0{${digitLength}}$`);

      expect(useLock(mockStore).paddedCountdown.value).toMatch(regex);
    });

    it('pads with zeros any figure smaller in digit length than the lockTimeout', async () => {
      mockStore.state.lockTimeout = 100;
      wrapper = createWrapper(mockStore);

      countdownRef.value = 9;
      await wrapper.vm.$nextTick();

      const paddedCountdown = wrapper.vm.paddedCountdown;
      expect(paddedCountdown).toMatch(/^0+\d+$/);
      expect(parseInt(paddedCountdown)).toBe(countdownRef.value);
    });
  });

  describe('isPinLocked', () => {
    it('returns a boolean', () => {
      expect(typeof useLock(mockStore).isPinLocked.value).toBe('boolean');
    });

    it.each([true, false])(
      'reflects the status of the countdown as it unfolds while pin reset after locking is %s', 
      async (isResetOnTimeout) => {
        wrapper = createWrapper(mockStore, isResetOnTimeout);
        
        expect(wrapper.vm.isPinLocked).toBe(false);

        countdownRef.value = 10;
        mockStore.state.failCount = 1;
        await wrapper.vm.$nextTick();
        
        expect(wrapper.vm.isPinLocked).toBe(true);

        countdownRef.value = 0;
        mockStore.state.failCount = 0;
        await wrapper.vm.$nextTick();
        
        expect(wrapper.vm.isPinLocked).toBe(false);
      }
    );
  });
});