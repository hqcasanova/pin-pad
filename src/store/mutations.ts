import { MutationTree } from 'vuex';
import { State } from "./state";

export enum MutationType {
  PinUpdate = 'PIN_UPDATE',
  PinSuccess = 'PIN_SUCCESS',
  PinFail = 'PIN_FAIL',
  PinClear = 'PIN_CLEAR',
  PinReset = 'PIN_RESET'
}

export type Mutations = {
  [MutationType.PinUpdate]: (state: State, value: string) => void,
  [MutationType.PinSuccess]: (state: State) => void,
  [MutationType.PinFail]: (state: State) => void,
  [MutationType.PinClear]: (state: State) => void,
  [MutationType.PinReset]: (state: State) => void
}

export const mutations: MutationTree<State> & Mutations = {
  [MutationType.PinUpdate](state, value) {
    state.code = `${state.code}${value}`;
  },

  [MutationType.PinSuccess](state) {
    state.failCount = 0;
  },

  [MutationType.PinFail](state) {
    if (state.failCount === -1) {
      state.failCount = 1;
    } else {
      state.failCount++;
    }
  },

  [MutationType.PinClear](state) {
    state.code = '';
  },

  [MutationType.PinReset](state) {
    state.code = '';
    state.failCount = -1;
  }
}
