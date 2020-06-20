let newId = 0

export const state = () => ({
  notifications: []
})

export const mutations = {
  PUSH(state: { notifications: any[] }, notification: any) {
    state.notifications.push({
      ...notification,
      id: newId++
    })
  },

  REMOVE(state: { notifications: any[] }, notificationToRemove: { id: any }) {
    state.notifications = state.notifications.filter(
      (notification: { id: any }) => notification.id !== notificationToRemove.id
    )
  }
}

export const actions = {
  add({ commit }: any, notification: any) {
    commit('PUSH', notification)
  },

  remove({ commit }: any, notificationToRemove: any) {
    commit('REMOVE', notificationToRemove)
  }
}
