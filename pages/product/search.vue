<template>
  <div class="container">
    <h1 class="col-12 justify-content-center">
      Search products
    </h1>

    <div class="row">
      <div class="col-12">
        <div class="input-group mb-3">
          <input
            id="searchInput"
            v-model="search"
            type="text"
            class="form-control"
            placeholder="Product's title"
            aria-label="Product's title"
          />
          <div class="input-group-append">
            <button
              class="btn btn-outline-secondary"
              type="button"
              :disabled="search === ''"
              @click="query"
            >
              SEARCH
            </button>
          </div>
        </div>
      </div>
    </div>

    <template v-if="show && products.length > 0">
      <div>
        <h1>
          Products found
          <span class="badge -fill-gradient">{{
            products ? products.length : 0
          }}</span>
        </h1>

        <div
          v-for="(groups, index) in chunkItemsByValue(products, 3)"
          :key="index"
          class="row"
        >
          <div class="card-deck">
            <ProductItem
              v-for="product in groups"
              :key="product.id"
              :product="product"
              :data-index="product.id"
            />
          </div>
        </div>
      </div>
    </template>
    <p v-else>
      {{ search === '' ? 'Type your search criteria' : answer }}
    </p>
  </div>
</template>

<script>
import _ from 'lodash'
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

  data() {
    return {
      search: '',
      answer: 'Type your search criteria',
      show: false
    }
  },

  computed: mapState({
    products: (state) => state.product.productsQuery
  }),

  watch: {
    search() {
      if (this.search === '') {
        this.answer = 'Type your search criteria'
        this.show = false
      }
    }
  },

  methods: {
    chunkItemsByValue(items, value) {
      return _.chunk(items, value)
    },

    async query() {
      await this.$store.dispatch('product/filterProducts', this.search)
      if (this.search === '') this.answer = 'Type your search criteria'
      else this.answer = 'No products found'

      this.show = true
    }
  },

  head() {
    return {
      title: 'Products Searching'
    }
  }
}
</script>

<style scoped>
input {
  border-radius: 5px;
}

.btn-outline-secondary {
  color: white;
  height: auto;
}
</style>
