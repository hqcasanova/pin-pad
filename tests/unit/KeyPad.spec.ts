import { mount, VueWrapper } from '@vue/test-utils';
import Vue3TouchEvents from 'vue3-touch-events';

import AppKeypad from '@/components/AppKeypad.vue';

describe('Key pad', () => {
  
  /* SETUP */
  let handler: jest.SpyInstance;
  let wrapper: VueWrapper<any>;
  const keyValues = [1, 2, 3];

  const testInteraction = async (eventName: string, target: string = 'button') => {
    const targetEl = wrapper.find(target);
    
    await targetEl.trigger(eventName);
    return expect(handler);
  };

  beforeEach(() => {
    wrapper = mount(AppKeypad, {
      props: { keyValues },
      global: { plugins: [Vue3TouchEvents] }
    });
    handler = jest.spyOn(wrapper.vm, 'pinUpdate');
  });

  afterEach(() => {
    wrapper.unmount();
    jest.clearAllMocks();
  });

  /* TESTS */
  it('renders the keys passed in', () => {
    expect(wrapper.text()).toMatch(keyValues.join(''));
  });

  it('receives the number corresponding to the first key of the keypad after clicking', async () => {
    await testInteraction('mouseup').then(expectedHandler => {
      expectedHandler.toHaveBeenCalledWith(keyValues[0]);
    });
  });

  it('receives the number corresponding to the keyboard key pressed when global key handler enabled', async () => {
    const keyEvent = new KeyboardEvent('keydown', { key: keyValues[0].toString() } );
    await wrapper.setProps({ isGlobalKeyHandler: true });
    
    document.dispatchEvent(keyEvent);
    expect(handler).toHaveBeenCalledWith(keyValues[0]);
  });

  it('prevents user interactions if isDisabled set to true', async () => {
    await wrapper.setProps({ isDisabled: true });
    
    expect(wrapper.find('button').element.disabled).toBe(true);
    await testInteraction('mouseup').then(expectedHandler => {
      expectedHandler.not.toHaveBeenCalled();
    });
  });

  it('allows user interactions but ignores them if isInputBlocked is set to true', async () => {
    await wrapper.setProps({ isInputBlocked: true });
    
    expect(wrapper.find('button').element.disabled).toBe(false);
    await testInteraction('mouseup').then(expectedHandler => {
      expectedHandler.not.toHaveBeenCalled();
    });
  });
});
