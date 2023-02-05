import { getters } from '@/store/getters';
import { state, State } from '@/store/state';

let currState: State;

describe('Getters', () => {
  beforeEach(() => {
    currState = { ...state };
  });

  describe('isPinShort', () => {
    it('true if current code is not the required length for a valid PIN', () => {
      currState.code = '123';
      currState.validLength = 4;
      
      const isShort = getters.isPinShort(currState);
  
      expect(isShort).toBe(true);
    });

    it('false if current code is the length of a valid PIN', () => {
      currState.code = '123';
      currState.validLength = 3;
      
      const isShort = getters.isPinShort(currState);
  
      expect(isShort).toBe(false);
    });
  });
  

  describe('isFail and isSuccess', () => {
    it('only isFail true when there has been at least 1 validation failure', () => {
      currState.failCount = 1;
      
      const isFail = getters.isFail(currState);
      const isSuccess = getters.isSuccess(currState);

      expect(isFail).toBe(true);
      expect(isSuccess).toBe(false);
    });

    it('only isSuccess true if there has been no validation failures', () => {
      currState.failCount = 0;
      
      const isFail = getters.isFail(currState);
      const isSuccess = getters.isSuccess(currState);

      expect(isFail).toBe(false);
      expect(isSuccess).toBe(true);
    });
  });

  describe('isLockFailCount', () => {
    it('false if there are no validation failures, regardless of the lock threshold', () => {
      currState.failCount = 0;
      currState.lockThreshold = 3;
      
      const isLockFailCount = getters.isLockFailCount(currState);

      expect(isLockFailCount).toBe(false);
    });

    it('false if there are validation failures but their number is not a multiple of the lock threshold', () => {
      currState.failCount = 7;
      currState.lockThreshold = 3;

      const isLockFailCount = getters.isLockFailCount(currState);

      expect(isLockFailCount).toBe(false);
    });

    it('true if there are validation failures and their number is a multiple of the lock threshold', () => {
      currState.failCount = 12;
      currState.lockThreshold = 3;
      
      const isLockFailCount = getters.isLockFailCount(currState);

      expect(isLockFailCount).toBe(true);
    });
  });

  describe('isLastAttempt', () => {
    it('false if there are no validation failures, regardless of the lock threshold', () => {
      currState.failCount = 0;
      currState.lockThreshold = 3;
      
      const isLastAttempt = getters.isLastAttempt(currState);

      expect(isLastAttempt).toBe(false);
    });

    it('false if the number of validation failures is not below a multiple of the locking threshold by 1', () => {
      currState.failCount = 7;
      currState.lockThreshold = 3;
      
      const isLastAttempt = getters.isLastAttempt(currState);

      expect(isLastAttempt).toBe(false);
    });

    it('true if the number of validation failures is below a multiple of the locking threshold by 1', () => {
      currState.failCount = 5;
      currState.lockThreshold = 3;
      
      const isLastAttempt = getters.isLastAttempt(currState);

      expect(isLastAttempt).toBe(true);
    });
  });
});