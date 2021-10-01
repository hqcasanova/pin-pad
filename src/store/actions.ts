import { ActionContext, ActionTree } from "vuex";
import { Mutations, MutationType } from "./mutations";
import { State } from "./state";
import { validate } from "@/api";

export enum ActionType {
  ValidatePin = 'VALIDATE_PIN'
}

// Automatic detection of valid commit parameters thru mutation typing
type ActionAugments = Omit<ActionContext<State, State>, 'commit'> & {
  commit<K extends keyof Mutations>(
    key: K,
    payload?: Parameters<Mutations[K]>[1]
  ): ReturnType<Mutations[K]>
}

export type Actions = {
  [ActionType.ValidatePin](context: ActionAugments): Promise<unknown>
}

export const actions: ActionTree<State, State> & Actions = {
  async [ActionType.ValidatePin]({ state, commit }) {
    let validated;

    try {
      validated = await validate(state.code);
      commit(MutationType.PinValid);
      return validated;

    } catch (error) {
      commit(MutationType.PinFail);
    }
  }
}


