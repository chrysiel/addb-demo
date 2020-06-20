import { GetterTree, ActionTree, MutationTree } from 'vuex'
import { $axios } from '~/utils/api'

export const state = () => ({
  things: [],
  name: 'Me'
})

export type RootState = ReturnType<typeof state>

export const getters: GetterTree<RootState, RootState> = {
  name: (state) => state.name
}

export const mutations: MutationTree<RootState> = {
  CHANGE_NAME: (state, newName: string) => (state.name = newName)
}

export const actions: ActionTree<RootState, RootState> = {
  fetchThings({ commit }) {
    const things = $axios.$get('/things')
    console.log(things)
    commit('CHANGE_NAME', 'New name')
  }
}
