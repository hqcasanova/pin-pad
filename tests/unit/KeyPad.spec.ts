import { mount, VueWrapper } from '@vue/test-utils';
import Vue3TouchEvents from 'vue3-touch-events';

import AppKeypad from '@/components/AppKeypad.vue';

describe('Key pad', () => {
  
  /* SETUP */
  let handler: jest.SpyInstance;
  let wrapper: VueWrapper<any>;
  const keyValues = [1, 2, 3];

  const testInteraction = async (eventHandler: jest.SpyInstance, eventName: string = 'mouseup', target: string = 'button') => {
    const button = wrapper.find(target);
    
    await button.trigger(eventName);
    return expect(eventHandler);
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
    await testInteraction(handler).then(expectation => {
      expectation.toHaveBeenCalledWith(keyValues[0]);
    });
  });

  it('prevents user interactions if isDisabled set to true', async () => {
    await wrapper.setProps({ isDisabled: true });
    
    expect(wrapper.find('button').element.disabled).toBe(true);
    await testInteraction(handler).then(expectation => {
      expectation.not.toHaveBeenCalled();
    });
  });

  it('allows user interactions but ignores them if isInputBlocked is set to true', async () => {
    await wrapper.setProps({ isInputBlocked: true });
    
    expect(wrapper.find('button').element.disabled).toBe(false);
    await testInteraction(handler).then(expectation => {
      expectation.not.toHaveBeenCalled();
    });
  });
});
