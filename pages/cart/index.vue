<template>
  <div class="container">
    <div class="row justify-content-center">
      <h1 class="col-12 justify-content-center">
        Cart
      </h1>
      <div v-if="productsInCart.length > 0">
        <div>
          <ProductCard
            v-for="(product, index) in productsInCart"
            :key="index"
            :product="product"
            :data-index="index"
          />
        </div>
      </div>
      <div v-else>
        <span class="col-12">Your cart is empty</span>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import ProductCard from '@/components/ProductCard.vue'

export default {
  components: {
    ProductCard
  },

  async fetch({ store, error }) {
    try {
      await store.dispatch('product/fetchAllProducts')
    } catch (e) {
      error({
        statusCode: 503,
        message: 'Unable to fetch products in cart at this time'
      })
    }
  },

  computed: mapState({
    productsInCart: (state) => state.product.productsInCart
  }),

  head() {
    return {
      title: 'Products Listing'
    }
  }
}
</script>
