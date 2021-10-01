import { store } from '@/store';
import { actions, ActionType } from '@/store/actions';
import { shallowMount, VueWrapper } from '@vue/test-utils';
import Keypad from '@/components/layout/Keypad.vue';
import { MutationType } from '@/store/mutations';

describe('Key pad', () => {
  let global: any, wrapper: VueWrapper<any>;

  beforeAll(() => {
    global = { plugins: [store] };
    wrapper = shallowMount(Keypad, { global });
  });

  afterEach(() => {
    store.commit(MutationType.PinReset);;
  });

  afterAll(() => {
    wrapper.unmount();
  });

  it('Each key press adds updates the PIN code until the required length is reached', () => {
    let code = '';
    let i = 0;

    for (i; i < store.state.maxLength; i++) {
      wrapper.vm.onKeyPressed(i);
      code = `${code}${i}`;
    }
    expect(store.state.code).toMatch(code);
  });

  it('Key presses beyond the required PIN code length do not produce a longer PIN', () => {
    let i = 0;

    for (i; i < store.state.maxLength + 1; i++) {
      wrapper.vm.onKeyPressed(i);
    }
    
    expect(store.state.code.length).toBeLessThan(store.state.maxLength);
  });

  it('With number of key presses equal to required PIN length, PIN is reset on next keypress if not validating', () => {
    let i = 0;

    spyOn(actions, ActionType.ValidatePin);

    for (i; i <= store.state.maxLength; i++) {
      wrapper.vm.onKeyPressed(i);
    }
    expect(actions[ActionType.ValidatePin]).not.toHaveBeenCalled();
    expect(store.state.code).toMatch('');
  });
});


