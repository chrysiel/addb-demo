export const strict = false

export const state = () => ({
  isLoading: true,
  products: [],
  productsTotalLength: 0,
  product: {},
  productsInCart: [],
  productsInCartTotalLength: 0,
  perPage: 3,
  productsQuery: [],
  productsQueryLength: 0
})

export const mutations = {
  SET_PRODUCTS(state, products) {
    state.products = products
  },

  SET_PRODUCTS_TOTAL_LENGTH(state, total) {
    state.productsTotalLength = total
  },

  SET_PRODUCTS_IN_CART(state, products) {
    state.productsInCart = products
  },

  SET_PRODUCTS_IN_CART_TOTAL_LENGTH(state, total) {
    state.productsInCartTotalLength = total
  },

  SET_PRODUCT(state, product) {
    state.product = product
  },

  ADD_PRODUCT(state, product) {
    state.products.push(product)
  },

  SET_PRODUCTS_QUERY(state, products) {
    state.productsQuery = products
  },

  SET_PRODUCTS_QUERY_TOTAL_LENGTH(state, total) {
    state.productsQueryLength = total
  },

  async updateProduct({ commit, state }, { product, action }) {
    if (action === 'added') {
      product.count++
      if (!product.added) product.added = true
    } else {
      product.count--
      if (product.count === 0) product.added = false
    }

    await this.$axios
      .$put(`/products/${product.id}`, product)
      .then((response) => {
        if (action === 'added') {
          this.$router.push({
            path: '/cart'
          })
        } else {
          this.$router.push({
            path: '/'
          })
        }

        /* const notification = {
          type: 'success',
          message: 'Your product has been ' + action + ' to cart'
        }
        dispatch('notification/add', notification, {
          root: true
        }) */
      })
      .catch((error) => {
        /* const notification = {
          type: 'error',
          message: `There was an error updating product: ${error.message}`
        }
        dispatch('notification/add', notification, {
          root: true
        }) */
        throw error
      })
  }
}

export const actions = {
  async fetchAllProducts({ commit, state, dispatch }) {
    await this.$axios
      .$get('/products')
      .then((response) => {
        commit('SET_PRODUCTS', response)
        commit('SET_PRODUCTS_TOTAL_LENGTH', response.length)

        dispatch('product/fetchProductsInCart', null, {
          root: true
        })

        state.isLoading = false
      })
      .catch((error) => {
        const notification = {
          type: 'error',
          message: `There was an error fetching products: ${error.message}`
        }
        dispatch('notification/add', notification, {
          root: true
        })
      })
  },

  fetchProductsInCart({ commit, state }) {
    const productsInCart = state.products.filter(function(product) {
      return product.added && product.count > 0
    })

    const total = productsInCart.reduce(
      (sum, current) => sum + current.count,
      0
    )

    commit('SET_PRODUCTS_IN_CART', productsInCart)
    commit('SET_PRODUCTS_IN_CART_TOTAL_LENGTH', total)

    state.isLoading = false

    return state.productsInCart
  },

  async fetchProducts({ commit, state, dispatch, rootState }, { page }) {
    await this.$axios
      .$get(`/products?_limit=${state.perPage}&_page=${page}`)
      .then((response) => {
        commit('SET_PRODUCTS', response)
        commit('SET_PRODUCTS_TOTAL_LENGTH', response.length)

        dispatch('product/fetchProductsInCart', null, {
          root: true
        })

        state.isLoading = false
      })
      .catch((error) => {
        const notification = {
          type: 'error',
          message: `There was an error fetching products: ${error.message}`
        }
        dispatch('notification/add', notification, {
          root: true
        })
      })
  },

  async fetchProduct({ commit, state, getters }, id) {
    if (id === state.product.id) {
      return state.product
    }

    const product = getters.getProductById(id)

    if (product) {
      commit('SET_PRODUCT', product)
      return product
    } else {
      await this.$axios.$get(`/products/${id}`).then((response) => {
        commit('SET_PRODUCT', response.data)
        return response.data
      })
    }
  },

  async createProduct({ commit, state, dispatch }, product) {
    // Call mutations only inside current module not from another
    await this.$axios
      .$post('/products', product)
      .then((response) => {
        const productsTotalLength = state.productsTotalLength + 1
        commit('ADD_PRODUCT', response)
        commit('SET_PRODUCTS_TOTAL_LENGTH', productsTotalLength)

        const notification = {
          type: 'success',
          message: 'Your product has been created'
        }
        dispatch('notification/add', notification, {
          root: true
        })

        return response
      })
      .catch((error) => {
        const notification = {
          type: 'error',
          message: `There was an error creating product: ${error.message}`
        }
        dispatch('notification/add', notification, {
          root: true
        })
        throw error
      })
  },

  async filterProducts({ commit, state, dispatch }, query) {
    await this.$axios
      .$get(`/products?q=${query}`)
      .then((response) => {
        commit('SET_PRODUCTS_QUERY', response)
        commit('SET_PRODUCTS_QUERY_TOTAL_LENGTH', response.length)

        state.isLoading = false
      })
      .catch((error) => {
        const notification = {
          type: 'error',
          message: `There was an error querying products: ${error.message}`
        }
        dispatch('notification/add', notification, {
          root: true
        })
      })
  }
}

export const getters = {
  getProductById: (state) => (id) => {
    return state.products.find((product) => product && product.id === id)
  }
}
