import { DOMWrapper, mount, VueWrapper } from '@vue/test-utils';
import AppDisplay from '@/components/AppDisplay.vue';

describe('AppDisplay', () => {
  
  /* SETUP */
  type CodeParameters = {
    initCode: string,
    validLength?: number,
    visibleFromLast?: number,
  } 

  let wrapper: VueWrapper<any>;
  let areas: DOMWrapper<Element>[];
  let titleArea: DOMWrapper<Element> | undefined;
  let feedbackArea: DOMWrapper<Element> | undefined;
  let pinArea: DOMWrapper<Element> | undefined;

  const createWrapper = (
    { initCode, validLength = 4, visibleFromLast = 1 }: CodeParameters,
    deltaGetters: Object = {}
  ) => {
    const initGetters = { isFail: false, isSuccess: false, isLastAttempt: false };

    return mount(AppDisplay, {
      props: { code: initCode, validLength, visibleFromLast },
      global: {
        provide: {
          store: { 
            getters: { ...initGetters, ...deltaGetters }
          }
        }
      }
    });
  };

  afterEach(() => {
    wrapper.unmount();
  });

  /* TESTS */
  it('renders the title and feedback areas with text and the pin area with the right number of placeholders', () => {
    const codeParams = {
      initCode: '',
      validLength: 4,
    };

    wrapper = createWrapper(codeParams);
    areas = wrapper.findAll('[test~="display-item"]');
    titleArea = wrapper.find('[test~="title"]');
    feedbackArea = wrapper.find('[test~="feedback"]');
    pinArea = wrapper.find('[test~="pin"]');
    
    expect(areas).toHaveLength(3);
    expect(titleArea).toBeDefined();
    expect(titleArea?.text()).not.toBe('');
    expect(feedbackArea).toBeDefined();
    expect(feedbackArea?.text()).not.toBe('');
    expect(pinArea).toBeDefined();
    expect(pinArea?.element.childElementCount).toBe(codeParams.validLength);
    expect(pinArea?.text()).toBe(codeParams.initCode);
  });

  describe('Pin Area', () => {
    it('shows only the visible digits of the keyed in code', async () => {
      const codeParams = {
        initCode: '123',
        visibleFromLast: 1
      };
      const visibleCode = codeParams.initCode.slice(-codeParams.visibleFromLast);
      
      wrapper = createWrapper(codeParams);
      await wrapper.setProps({ code: codeParams.initCode });
      pinArea = wrapper.find('[test~="pin"]');

      expect(pinArea).toBeDefined();
      expect(pinArea?.text()).toMatch(visibleCode);
    });

    it('is not on loading state if validation not under way', async () => {
      const codeParams = {
        initCode: '123',
        validLength: 4,
        visibleFromLast: 1
      };
      
      wrapper = createWrapper(codeParams);
      await wrapper.setProps({ isValidating: false });
      pinArea = wrapper.find('[test~="pin"]');
      
      expect(pinArea).toBeDefined();
      expect(pinArea?.classes()).not.toContain('app-display__pin--loading');
    });

    it('transitions into the loading state while validating', async () => {
      const codeParams = { initCode: '123' };
      
      wrapper = createWrapper(codeParams);
      await wrapper.setProps({ isValidating: true });
      pinArea = wrapper.find('[test~="pin"]');
      
      expect(pinArea).toBeDefined();
      expect(pinArea?.classes()).toContain('app-display__pin--loading');
    });
  });

  describe('Title Area', () => {
    it('shows the word "LOCKED" if the pin is wrong and locked', async () => {
      const codeParams = { initCode: '123' };

      wrapper = createWrapper(codeParams, { isFail: true });
      await wrapper.setProps({ isPinLocked: true });
      titleArea = wrapper.find('[test~="title"]');
      
      expect(titleArea).toBeDefined();
      expect(titleArea?.text()).toContain('LOCKED');
    });

    it('shows the word "ERROR" if the pin is wrong', async () => {
      const codeParams = { initCode: '123' };

      wrapper = createWrapper(codeParams, { isFail: true });
      titleArea = wrapper.find('[test~="title"]');

      expect(titleArea).toBeDefined();
      expect(titleArea?.text()).toContain('ERROR');
    });

    it('shows the word "OK" if the pin is right', async () => {
      const codeParams = { initCode: '123' };

      wrapper = createWrapper(codeParams, { isSuccess: true });
      titleArea = wrapper.find('[test~="title"]');

      expect(titleArea).toBeDefined();
      expect(titleArea?.text()).toContain('OK');
    });
  });

  describe('Feedback Area', () => {
    it('shows the sentence "Last try remaining" if the ping is wrong and is the last attempt', async () => {
      const codeParams = { initCode: '123' };

      wrapper = createWrapper(codeParams, { isFail: true, isLastAttempt: true });
      feedbackArea = wrapper.find('[test~="feedback"]');

      expect(feedbackArea).toBeDefined();
      expect(feedbackArea?.text()).toContain('Last try remaining');
    });

    it('shows the lock countdown if the pin is wrong and locked', async () => {
      const codeParams = { initCode: '123' };

      wrapper = createWrapper(codeParams, { isFail: true });
      await wrapper.setProps({ isPinLocked: true });
      feedbackArea = wrapper.find('[test~="feedback"]');
      
      expect(feedbackArea).toBeDefined();
      expect(feedbackArea?.text()).toMatch(/Please wait \d+ seconds/);
    });
  });
});
