import { GetterTree } from 'vuex'
import { State } from './state'

export type Getters = {
  isFail: (state: State) => boolean,
  isSuccess: (state: State) => boolean,
  isPinShort: (state: State) => boolean,
  isLockFailCount: (state: State) => boolean,
  isLastAttempt: (state: State) => boolean
}

export const getters: GetterTree<State, State> & Getters = {
  isPinShort(state) {
    return state.code.length < state.validLength;
  },
  
  isFail(state) { 
    return state.failCount > 0;
  },

  isSuccess(state) {
    return state.failCount === 0;
  },

  isLockFailCount(state) {
    return (state.failCount > 0) && (state.failCount % state.lockThreshold === 0);
  },
  
  isLastAttempt(state) {
    return state.failCount % state.lockThreshold === state.lockThreshold - 1;
  }
}
