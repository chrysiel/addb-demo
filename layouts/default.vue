<template>
  <div id="app">
    <NavBar />

    <NotificationContainer />

    <nuxt />
  </div>
</template>

<script>
import NavBar from '~/components/NavBar.vue'
import NotificationContainer from '~/components/NotificationContainer'

export default {
  components: {
    NavBar,
    NotificationContainer
  },

  head() {
    return {
      titleTemplate: '%s - Real World Products',
      meta: [
        {
          hid: 'description',
          name: 'description',
          content:
            'Where you can find all the products taking place in your neighborhood'
        }
      ]
    }
  }
}
</script>

<style lang="scss">
@import './assets/styles/global.scss';

.page {
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  min-height: calc(100vh - 56px);
}
</style>
