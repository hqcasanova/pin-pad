import { ActionContext, ActionTree } from "vuex";
import { Mutations, MutationType } from "./mutations";
import { State } from "./state";
import { validate } from "@/api";

export enum ActionType {
  ValidatePin = 'VALIDATE_PIN',
  UpdatePin = 'UPDATE_PIN',
  ClearPin = 'CLEAR_PIN',
  ResetPin = 'RESET_PIN'
}

// Automatic detection of valid commit parameters thru mutation typing
export type ActionAugments = Omit<ActionContext<State, State>, 'commit'> & {
  commit<K extends keyof Mutations>(
    key: K,
    payload?: Parameters<Mutations[K]>[1]
  ): ReturnType<Mutations[K]>
}

export type Actions = {
  [ActionType.ValidatePin]: (context: ActionAugments) => Promise<unknown>,
  [ActionType.UpdatePin]: (context: ActionAugments, newValue: number | string) => void,
  [ActionType.ClearPin]: (context: ActionAugments) => void,
  [ActionType.ResetPin]: (context: ActionAugments) => void
}

export const actions: ActionTree<State, State> & Actions = {
  async [ActionType.ValidatePin]({ state, commit }) {
    try {
      await validate(state.code);
      commit(MutationType.PinSuccess);
     
    } catch (error) {
      commit(MutationType.PinFail);
    }
  },

  [ActionType.UpdatePin]({ commit }, newValue) {
    commit(MutationType.PinUpdate, newValue.toString());
  },

  [ActionType.ClearPin]({ commit }) {
    commit(MutationType.PinClear);
  },

  [ActionType.ResetPin]({ commit }) {
    commit(MutationType.PinReset);
  }
}
