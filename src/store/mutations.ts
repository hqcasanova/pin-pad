import { MutationTree } from 'vuex';
import { State } from "./state";

export enum MutationType {
  pinUpdate = 'PIN_UPDATE',
  PinSuccess = 'PIN_SUCCESS',
  PinFail = 'PIN_FAIL',
  PinReset = 'PIN_RESET'
}

export type Mutations = {
  [MutationType.pinUpdate]: (state: State, code: string) => void,
  [MutationType.PinSuccess]: (state: State) => void,
  [MutationType.PinFail]: (state: State) => void,
  [MutationType.PinReset]: (state: State) => void
}

export const mutations: MutationTree<State> & Mutations = {
  [MutationType.pinUpdate](state, code) {
    state.code = `${state.code}${code}`;
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

  [MutationType.PinReset](state) {
    state.code = '';
  }
}
