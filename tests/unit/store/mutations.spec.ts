import { mutations, MutationType } from '@/store/mutations';
import { State, state } from '@/store/state';

let currState: State;

describe('Mutations', () => {
  beforeEach(() => {
    currState = { ...state };
  });

  describe('Mutating Code', () => {
    it('PinUpdate: adds a value to the current code', () => {
      const value = '4';
      currState.code = '123';

      mutations[MutationType.PinUpdate](currState, value);

      expect(currState).toEqual({ ...currState, code: '1234' });
    });

    it('PinClear: clears the current code', () => {
      currState.code = '123';

      mutations[MutationType.PinClear](currState);

      expect(currState).toEqual({ ...currState, code: '' });
    });
  });

  describe('Mutating Fail count', () => {
    it('PinSuccess: resets the fail count to 0', () => {
      currState.failCount = 5;
      
      mutations[MutationType.PinSuccess](currState);

      expect(currState).toEqual({ ...currState, failCount: 0 });
    });

    describe('PinFail', () => {
      it('sets the fail count to 1 if it was -1 previously', () => {
        currState.failCount = -1;

        mutations[MutationType.PinFail](currState);

        expect(currState).toEqual({ ...currState, failCount: 1 });
      });

      it('increments the fail count if it was not -1 previously', () => {
        currState.failCount = 5;
        
        mutations[MutationType.PinFail](currState);

        expect(currState).toEqual({ ...currState, failCount: 6 });
      });
    });
  });

  describe('Mutating both code and fail count', () => {
    it('PinReset: clear the pin code and sets the fail count back to -1', () => {
      currState.failCount = 5;
      currState.code = '123';

      mutations[MutationType.PinReset](currState);

      expect(currState).toEqual({ ...currState, code: '', failCount: -1 });
    });
  });
});