<template>
  <div class="notification-bar" :class="notificationTypeClass" role="alert">
    {{ notification.message }}
  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  props: {
    notification: {
      type: Object,
      required: true
    }
  },

  data() {
    return {
      timeout: null
    }
  },

  computed: {
    notificationTypeClass() {
      return `alert alert-${this.notification.type}`
    }
  },

  mounted() {
    this.timeout = setTimeout(() => this.remove(this.notification), 5000)
  },
  beforeDestroy() {
    clearTimeout(this.timeout)
  },

  methods: mapActions('notification', ['remove'])
}
</script>

<style scoped>
.notification-bar {
  margin: 1em 0 1em;
}
</style>
