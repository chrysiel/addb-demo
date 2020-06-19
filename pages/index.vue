<template>
  <div class="container">
    <h1 class="col-12 justify-content-center">
      Products
    </h1>
    <div
      v-for="(groups, index) in chunkItemsByValue(products, 3)"
      :key="index"
      class="row"
    >
      <div v-if="products">
        <div class="card-deck">
          <ProductItem
            v-for="product in groups"
            :key="product.id"
            :product="product"
            :data-index="product.id"
          />
        </div>
      </div>
      <div v-else>
        <h1 class="col-12 justify-content-center">
          No products found
        </h1>
      </div>
    </div>

    <!-- <nav aria-label="Page navigation example">
      <ul class="pagination justify-content-end">
        <li class="page-item disabled">
          <a class="page-link" href="#" tabindex="-1">Previous</a>
        </li>
        <li class="page-item active"><a class="page-link" href="#">1</a></li>
        <li class="page-item"><a class="page-link" href="#">2</a></li>
        <li class="page-item"><a class="page-link" href="#">3</a></li>
        <li class="page-item">
          <a class="page-link" href="#">Next</a>
        </li>
      </ul>
    </nav> -->
  </div>
</template>

<script>
import _ from 'lodash'
// import ProductService from '@/services/ProductService'
import { mapState } from 'vuex'
import ProductItem from '@/components/ProductItem.vue'

export default {
  components: {
    ProductItem
  },

  // La méthode `fetch` est utilisée pour peupler le store avant d'effectuer le rendu de la page.
  async fetch({ store, error }) {
    try {
      await store.dispatch('product/fetchAllProducts')
    } catch (e) {
      error({
        statusCode: 503,
        message: 'Unable to fetch products at this time'
      })
    }
  },

  /* async asyncData({ $axios, error }) {
    try {
      const { data } = await ProductService.getProducts()
      return {
        products: data
      }
    } catch (e) {
      error({
        statusCode: 503,
        message: 'Unable to fetch products products at this time'
      })
    }
  }, */

  computed: mapState({
    products: (state) => state.product.products
  }),

  methods: {
    chunkItemsByValue(items, value) {
      return _.chunk(items, value)
    }
  },

  head() {
    return {
      title: 'Products Listing'
    }
  }
}
</script>

<style scoped>
.pagination {
  margin: 30px 0;
}
</style>
