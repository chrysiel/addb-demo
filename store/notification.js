let newId = 0

export const state = () => ({
  notifications: []
})

export const mutations = {
  PUSH(state, notification) {
    state.notifications.push({
      ...notification,
      id: newId++
    })
  },

  REMOVE(state, notificationToRemove) {
    state.notifications = state.notifications.filter(
      (notification) => notification.id !== notificationToRemove.id
    )
  }
}

export const actions = {
  add({ commit }, notification) {
    commit('PUSH', notification)
  },

  remove({ commit }, notificationToRemove) {
    commit('REMOVE', notificationToRemove)
  }
}
