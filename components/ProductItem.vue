<template>
  <div class="card">
    <img
      class="rounded mx-auto d-block"
      :src="product.image"
      :alt="product.title"
    />
    <div class="card-body">
      <h5 class="card-title justify-content-md-center">
        {{ product.title }}
      </h5>
      <p class="card-text">
        {{ product.description }}
      </p>
    </div>
    <div class="card-footer">
      <small class="text-muted"
        ><button type="button" @click="addToCart">
          {{ 'add to cart' | uppercase }}
        </button></small
      >
    </div>
  </div>
</template>

<script>
export default {
  name: 'ProductItem',

  filters: {
    uppercase(value) {
      if (!value) {
        return ''
      }

      return value.toString().toUpperCase()
    },

    capitalise(value) {
      if (!value) {
        return ''
      }

      return value.charAt(0).toUpperCase() + value.slice(1)
    },

    pluralize(n) {
      return n === 1 ? 'product' : 'products'
    }
  },

  props: {
    product: {
      type: Object,
      required: true
    }
  },

  methods: {
    async addToCart() {
      await this.$store.commit('product/updateProduct', {
        product: this.product,
        action: 'added'
      })
    }
  }
}
</script>

<style scoped>
img {
  width: 250px;
  height: 200px;
}
</style>
