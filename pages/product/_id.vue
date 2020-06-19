<template>
  <div>
    <div class="product-header">
      <h1 class="title">
        {{ product.title }}
      </h1>
    </div>

    <h2>Product details</h2>
    <p>{{ product.description }}</p>
  </div>
</template>

<script>
import { mapState } from 'vuex'
// import ProductService from '@/services/ProductService'

export default {
  validate({ params }) {
    // Doit être un nombre
    return /^\d+$/.test(params.id)
  },

  /* async asyncData({ error, params }) {
    try {
      const { data } = await ProductService.getProduct(params.id)
      return {
        product: data
      }
    } catch (e) {
      error({
        statusCode: 503,
        message: 'Unable to fetch product #' + params.id
      })
    }
  }, */

  async fetch({ store, params, error }) {
    try {
      await store.dispatch('product/fetchProduct', params.id)
    } catch (e) {
      error({
        statusCode: 503,
        message: 'Unable to fetch product #' + params.id
      })
    }
  },
  computed: mapState({
    product: (state) => state.product.product
  }),

  head() {
    return {
      title: this.product.title,
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: 'What you need to know about ' + this.product.title
        }
      ]
    }
  }
}
</script>

<style scoped>
.prompt-box {
  position: relative;
  overflow: hidden;
  padding: 1em;
  margin-bottom: 24px;
  transform: scaleY(1);
}
.prompt-box > .title {
  margin: 0 0 0.5em;
}
.prompt-box > .title > .meta {
  margin-left: 10px;
}
.prompt-box > .actions {
  display: flex;
  align-items: center;
}
.prompt-box > button {
  margin-right: 0.5em;
}
.prompt-box > button:last-of-type {
  margin-right: 0;
}
.location {
  margin-bottom: 0;
}
.location > .icon {
  margin-left: 10px;
}
.product-header > .title {
  margin: 0;
}
.list-group {
  margin: 0;
  padding: 0;
  list-style: none;
}
.list-group > .list-item {
  padding: 1em 0;
  border-bottom: solid 1px #e5e5e5;
}
</style>
