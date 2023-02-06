import useUpdate from '@/behaviours/useUpdate';
import { ActionType } from '@/store/actions';
import { State } from '@/store/state';
import { createStore, Store } from 'vuex';

describe('useUpdate', () => {
  let mockStore: Store<State>;
  let isPinShortValue: boolean = true;
  let mockDispatch: jest.SpyInstance;

  beforeEach(() => {
    mockStore = createStore({
      getters: { isPinShort: () => isPinShortValue },
      actions: { 
        [ActionType.ClearPin]: jest.fn(), 
        [ActionType.UpdatePin]: jest.fn()
      }
    });
    mockDispatch = jest.spyOn(mockStore, 'dispatch');
  });
  
  afterEach(() => {
    isPinShortValue = true;
    jest.clearAllMocks();
  });

  it('returns the pinUpdate method', () => {
    expect(useUpdate(mockStore).pinUpdate).toBeInstanceOf(Function);
  });

  describe('pinUpdate', () => {
    it('resets pin if it is the required length and then updates it', () => {
      const value = '5';
      isPinShortValue = false;

      useUpdate(mockStore).pinUpdate(value);

      expect(mockDispatch).toHaveBeenCalledTimes(2);
      expect(mockDispatch).toHaveBeenNthCalledWith(1, ActionType.ClearPin);
      expect(mockDispatch).toHaveBeenNthCalledWith(2, ActionType.UpdatePin, value);
    });

    it('only updates the pin accordingly', () => {
      const value = '6';
      isPinShortValue = true;

      useUpdate(mockStore).pinUpdate(value);

      expect(mockDispatch).toHaveBeenCalledTimes(1);
      expect(mockDispatch).toHaveBeenCalledWith(ActionType.UpdatePin, value);
    });
  })
});