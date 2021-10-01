import { MutationTree } from 'vuex';
import { State } from "./state";

export enum MutationType {
  PinUpdate = 'PIN_UPDATE',
  PinValid = 'PIN_VALID',
  PinFail = 'PIN_FAIL',
  PinReset = 'PIN_RESET'
}

export type Mutations = {
  [MutationType.PinUpdate](state: State, code: number | string): void,
  [MutationType.PinValid](state: State): void,
  [MutationType.PinFail](state: State): void,
  [MutationType.PinReset](state: State): void
}

export const mutations: MutationTree<State> & Mutations = {
  [MutationType.PinUpdate](state, code) {
    state.code = `${state.code}${code}`;
  },

  [MutationType.PinValid](state) {
    state.isValid = true;
    state.failCount = 0;
  },

  [MutationType.PinFail](state) {
    state.isValid = false;
    state.failCount++;
  },

  [MutationType.PinReset](state) {
    state.code = '';
  }
}