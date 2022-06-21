import { mount, VueWrapper } from '@vue/test-utils';
import Vue3TouchEvents from 'vue3-touch-events';

import AppKeypad from '@/components/layout/AppKeypad.vue';

describe('Key pad', () => {
  
  /* SETUP */
  let handler: jest.SpyInstance;
  let wrapper: VueWrapper<any>;
  const keyValues = [1, 2, 3];

  const testInteraction = async (eventName: string, target: string = 'button') => {
    const button = wrapper.find(target);
    
    await button.trigger(eventName);
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

  it('receives the number corresponding to the key the user interacted with', async () => {
    await testInteraction('mouseup').then(expectation => {
      expectation.toHaveBeenCalledWith(keyValues[0]);
    });
  });

  it('prevents user interactions if isDisabled set to true', async () => {
    await wrapper.setProps({ isDisabled: true });
    
    expect(wrapper.find('button').element.disabled).toBe(true);
    await testInteraction('mouseup').then(expectation => {
      expectation.not.toHaveBeenCalled();
    });
  });

  it('allows user interactions but ignores them if isBlockInput is set to true', async () => {
    await wrapper.setProps({ isBlockInput: true });
    
    expect(wrapper.find('button').element.disabled).toBe(false);
    await testInteraction('mouseup').then(expectation => {
      expectation.not.toHaveBeenCalled();
    });
  });
});
