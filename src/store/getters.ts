import { GetterTree } from 'vuex'
import { State } from './state'

export type Getters = {
  isPinShort(state: State): boolean,
  isLockFailCount(state: State): boolean,
  isLastAttempt(state: State): boolean
}

export const getters: GetterTree<State, State> & Getters = {
  
  // True if current code is not the required length for a valid PIN
  isPinShort(state) {
    return state.code.length < state.maxLength;
  },

  // True if the number of consecutive PIN validation fails exceeds the locking threshold
  // irrespective of the total count of fails.
  isLockFailCount(state) {
    return (state.failCount > 0) && (state.failCount % state.lockThreshold === 0);
  },
  
  // True if the number of validation failures is just below the locking threshold.
  isLastAttempt(state) {
    return state.failCount % state.lockThreshold === state.lockThreshold - 1;
  }
}