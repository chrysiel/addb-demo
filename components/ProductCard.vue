<template>
  <!-- <nuxt-link :to="'/product/' + product.id"> -->
  <div class="-shadow">
    <div class="row justify-content-between">
      <div class="col-2 d-flex align-items-center">
        <span class="cart-counter">X {{ product.count }}</span>
      </div>
      <div class="col-2 d-flex align-items-center">
        <img class="card-img-top" :src="product.image" :alt="product.title" />
      </div>
      <div class="col-6 align-items-center">
        <h4 class="justify-content-center">
          {{ product.title }}
        </h4>
        <span>{{ product.description }}</span>
      </div>
      <div class="col-2 d-flex align-items-center">
        <button type="button" @click="removeToCart">
          {{ 'remove' | uppercase }}
        </button>
      </div>
    </div>
  </div>
  <!-- </nuxt-link> -->
</template>

<script>
export default {
  name: 'ProductCard',

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

  computed: {
    parsedDate() {
      const eventDate = new Date(this.product.date)
      return eventDate.toDateString()
    }
  },

  methods: {
    async removeToCart() {
      await this.$store.commit('product/updateProduct', {
        product: this.product,
        action: 'removed'
      })

      this.$router.push({
        path: '/'
      })
    }
  }
}
</script>

<style scoped>
div.-shadow {
  padding: 20px;
  transition: all 0.2s linear;
  cursor: pointer;
}

div.-shadow:hover {
  transform: scale(1.01);
  box-shadow: 0 3px 12px 0 rgba(0, 0, 0, 0.2), 0 1px 15px 0 rgba(0, 0, 0, 0.19);
}

.cart-counter {
  font-size: 25px;
  font-weight: bold;
}

img {
  height: 100px;
}
</style>
