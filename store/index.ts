import { GetterTree, ActionTree, MutationTree } from 'vuex'
import { $axios } from '~/utils/api'

export const state = () => ({
  locales: ['en', 'fr'],
  locale: 'en',
  things: [],
  name: 'Me'
})

export type RootState = ReturnType<typeof state>

export const getters: GetterTree<RootState, RootState> = {
  name: (state) => state.name
}

export const mutations: MutationTree<RootState> = {
  CHANGE_NAME: (state, newName: string) => (state.name = newName),

  SET_LANG(state, locale: string) {
    if (state.locales.includes(locale)) {
      state.locale = locale
    }
  }
}

export const actions: ActionTree<RootState, RootState> = {
  fetchThings({ commit }) {
    const things = $axios.$get('/things')
    console.log(things)
    commit('CHANGE_NAME', 'New name')
  }
}
