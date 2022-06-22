import { DOMWrapper, mount, VueWrapper } from '@vue/test-utils';
import AppDisplay from '@/components/AppDisplay.vue';

describe('Display', () => {
  
  /* SETUP */
  let wrapper: VueWrapper<any>;
  let areas: DOMWrapper<Element>[];
  let titleArea: DOMWrapper<Element> | undefined;
  let feedbackArea: DOMWrapper<Element> | undefined;
  let pinArea: DOMWrapper<Element> | undefined;
  const code = '';
  const validLength = 4;
  const visibleFromLast = 1;

  const createWrapper = (deltaGetters: Object = {}) => {
    const initGetters = { isFail: false, isSuccess: false, isLastAttempt: false };

    wrapper = mount(AppDisplay, {
      props: { code, validLength, visibleFromLast },
      global: {
        mocks: {
          $store: { 
            getters: { ...initGetters, ...deltaGetters }
          }
        }
      }
    });

    areas = wrapper.findAll('.app-display__item');
    titleArea = areas.find(item => item.element.classList.contains('app-display__title'));
    feedbackArea = areas.find(item => item.element.classList.contains('app-display__feedback'));
    pinArea = areas.find(item => item.element.classList.contains('app-display__pin'));;
  }

  afterEach(() => {
    wrapper.unmount();
    jest.clearAllMocks();
  });

  /* TESTS */
  it('renders the title and feedback areas with text and a pin area with the right content', () => {
    createWrapper({ isFail: false, isSuccess: false });
    expect(areas).toHaveLength(3);
    expect(titleArea).toBeDefined();
    expect(titleArea?.text()).not.toBe('');
    expect(feedbackArea).toBeDefined();
    expect(feedbackArea?.text()).not.toBe('');
    expect(pinArea).toBeDefined();
    expect(pinArea?.element.childElementCount).toBe(validLength);
    expect(pinArea?.text()).toBe(code);
  });

  it('updates the pin area when the code changes, leaving the right positions visible', async () => {
    const code = '123';
    const visibleCode = code.slice(-visibleFromLast);
    
    createWrapper();
    await wrapper.setProps({ code });
    expect(pinArea?.text()).toMatch(visibleCode);
  });

  it('temporarily transitions the pin area into the loading state while validating', async () => {
    createWrapper();
    await wrapper.setProps({ isValidating: true });
    expect(pinArea?.classes()).toContain('app-display__pin--loading');
    
    await wrapper.setProps({ isValidating: false });
    expect(pinArea?.classes()).not.toContain('app-display__pin--loading');
  });

  it('shows the word "LOCKED" if the pin is wrong and locked', async () => {
    createWrapper({ isFail: true });
    await wrapper.setProps({ isPinLocked: true });
    
    expect(titleArea?.text()).toContain('LOCKED')
  });

  it('shows the word "ERROR" if the pin is wrong', async () => {
    createWrapper({ isFail: true });
    expect(titleArea?.text()).toContain('ERROR')
  });

  it('shows the word "OK" if the pin is right', async () => {
    createWrapper({ isSuccess: true });
    expect(titleArea?.text()).toContain('OK');
  });
});
