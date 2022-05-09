import { 
  createStore, 
  createLogger,
  Store as VuexStore,
  CommitOptions,
  DispatchOptions
} from 'vuex';
import { State, state } from './state';
import { Mutations, mutations } from './mutations';
import { Actions, actions } from './actions';
import { Getters, getters } from './getters';

export const store = createStore<State>({

  // logs every state transaction for debugging purposes
  plugins: process.env.NODE_ENV === 'development' ? [createLogger()] : [],
  
  state,
  mutations,
  actions,
  getters
});

// Adds support for the typings created so that they show up when referencing the store elsewhere
export type Store = Omit<
  VuexStore<State>,
  'getters' | 'commit' | 'dispatch'
> & {
  commit<K extends keyof Mutations, P extends Parameters<Mutations[K]>[1]>(
    key: K,
    payload?: P,
    options?: CommitOptions
  ): ReturnType<Mutations[K]>
} & {
  dispatch<K extends keyof Actions>(
    key: K,
    payload?: Parameters<Actions[K]>[1],
    options?: DispatchOptions
  ): ReturnType<Actions[K]>
} & {
  getters: {
    [K in keyof Getters]: ReturnType<Getters[K]>
  }
}

// Exposes typings above within composition API
export function useStore(): Store {
  return store;
}
