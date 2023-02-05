import { actions, ActionType, ActionAugments } from '@/store/actions';
import { MutationType } from '@/store/mutations';
import { state } from '@/store/state';
import { validate } from '@/api';

jest.mock('@/api', () => ({ validate: jest.fn() }));
const mockValidate = validate as jest.MockedFunction<typeof validate>;

describe('Actions', () => {
  let context: ActionAugments;

  beforeEach(() => {
    context = { 
      commit: jest.fn(),
      dispatch: jest.fn(),
      state,
      rootState: state,
      getters: {},
      rootGetters: {}
    };
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('ClearPin: triggers the PinClear mutation', () => {
    actions[ActionType.ClearPin](context);

    expect(context.commit).toHaveBeenCalledWith(MutationType.PinClear);
  });
  
  it('ResetPin: triggers the PinReset mutation', () => {
    actions[ActionType.ResetPin](context);

    expect(context.commit).toHaveBeenCalledWith(MutationType.PinReset);
  });

  it('UpdatePin: triggers the PinUpdate mutation with 5 as argument', () => {
    const newValue = '5';

    actions[ActionType.UpdatePin](context, newValue);

    expect(context.commit).toHaveBeenCalledWith(MutationType.PinUpdate, newValue);
  });

  describe('API calls', () => {
    it('ValidatePin: triggers PinSuccess if a response is succesfully retrieved', async () => {
      mockValidate.mockResolvedValue('');
      await actions[ActionType.ValidatePin](context);

      expect(context.commit).toHaveBeenCalledWith(MutationType.PinSuccess);
    });

    it('ValidatePin: triggers PinFail if an error is returned', async () => {
      mockValidate.mockRejectedValue('');

      await actions[ActionType.ValidatePin](context);

      expect(context.commit).toHaveBeenCalledWith(MutationType.PinFail);
    });
  });
});
