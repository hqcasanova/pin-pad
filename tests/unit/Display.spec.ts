import { store } from '@/store';
import { validPin } from '@/api';
import { actions, ActionType } from '@/store/actions';
import { shallowMount, VueWrapper } from '@vue/test-utils';
import Display from '@/components/layout/Display.vue';
import { MutationType } from '@/store/mutations';
import { nextTick } from 'vue';

describe('Key pad with automatic PIN reset on validation', () => {
  let props: any, global: any, wrapper: VueWrapper<any>;

  beforeAll(() => {
    props = { isResetOnValidation: true };
    global = { plugins: [store] };
    wrapper = shallowMount(Display, { global });
    store.commit(MutationType.PinReset);
  });

  it('Once the PIN code is of required length, it is validated', async () => {
    spyOn(actions, ActionType.ValidatePin);
    
    store.commit(MutationType.PinUpdate, validPin);

    // TODO: this should wait for DOM updates triggered by the state change above but it doesn't.
    // As a consequence, the check for the action call happens earlier than the call itself.
    await nextTick();
    
    expect(actions[ActionType.ValidatePin]).toBeCalled();
  });

  it('Once the PIN code has been validated, it has been reset', () => {    
  });

  it('If the validated PIN is valid, it shows the status as "OK"', () => { 
  });

  it('If the validated PIN is invalid, it shows the status as "ERROR"', () => { 
  });
});