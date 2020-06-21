/* eslint-disable */

// import { GetterTree, ActionTree, MutationTree } from 'vuex'
// import { RootState } from '~/store'
import { $axios } from '~/utils/api'

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

// export type ProductModuleState = ReturnType<typeof state>

/* export const getters: GetterTree<ProductModuleState, RootState> = {
  evenMore: (state) => state.more + 5,
  nameAndMore: (state, getters, rootState) => `${rootState.name}: ${state.more}`
}

export const actions: ActionTree<ProductModuleState, RootState> = {
  printRootState({ rootState }) {
    console.log('accessing rootState:', rootState.name)
  }
} */

export const mutations = {
  SET_PRODUCTS(state: { products: any }, products: any) {
    state.products = products
  },

  SET_PRODUCTS_TOTAL_LENGTH(state: { productsTotalLength: any }, total: any) {
    state.productsTotalLength = total
  },

  SET_PRODUCTS_IN_CART(state: { productsInCart: any }, products: any) {
    state.productsInCart = products
  },

  SET_PRODUCTS_IN_CART_TOTAL_LENGTH(
    state: { productsInCartTotalLength: any },
    total: any
  ) {
    state.productsInCartTotalLength = total
  },

  SET_PRODUCT(state: { product: any }, product: any) {
    state.product = product
  },

  ADD_PRODUCT(state: { products: any[] }, product: any) {
    state.products.push(product)
  },

  SET_PRODUCTS_QUERY(state: { productsQuery: any }, products: any) {
    state.productsQuery = products
  },

  SET_PRODUCTS_QUERY_TOTAL_LENGTH(
    state: { productsQueryLength: any },
    total: any
  ) {
    state.productsQueryLength = total
  },

  async updateProduct({ commit, state }: any, { product, action }: any) {
    if (action === 'added') {
      product.count++
      if (!product.added) product.added = true
    } else {
      product.count--
      if (product.count === 0) product.added = false
    }

    if ($axios)
      await $axios
        .$put(`/products/${product.id}`, product)
        .then((response: any) => {
          /* const notification = {
          type: 'success',
          message: 'Your product has been ' + action + ' to cart'
        }
        dispatch('notification/add', notification, {
          root: true
        }) */
        })
        .catch((error: any) => {
          /* const notification = {
          type: 'danger',
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
  async fetchAllProducts({ commit, state, dispatch }: any) {
    await $axios
      .$get('/products')
      .then((response: string | any[]) => {
        commit('SET_PRODUCTS', response)
        commit('SET_PRODUCTS_TOTAL_LENGTH', response.length)

        dispatch('product/fetchProductsInCart', null, {
          root: true
        })

        state.isLoading = false
      })
      .catch((error: { message: any }) => {
        const notification = {
          type: 'danger',
          message: `There was an error fetching products: ${error.message}`
        }
        dispatch('notification/add', notification, {
          root: true
        })
      })
  },

  async fetchProducts({ commit, state, dispatch }: any, { page }: any) {
    await $axios
      .$get(`/products?_limit=${state.perPage}&_page=${page}`)
      .then((response: string | any[]) => {
        commit('SET_PRODUCTS', response)
        commit('SET_PRODUCTS_TOTAL_LENGTH', response.length)

        dispatch('product/fetchProductsInCart', null, {
          root: true
        })

        state.isLoading = false
      })
      .catch((error: { message: any }) => {
        const notification = {
          type: 'danger',
          message: `There was an error fetching products: ${error.message}`
        }
        dispatch('notification/add', notification, {
          root: true
        })
      })
  },

  fetchProductsInCart({ commit, state, getters }: any) {
    let result = getters.getProductsInCart

    commit('SET_PRODUCTS_IN_CART', result.products)
    commit('SET_PRODUCTS_IN_CART_TOTAL_LENGTH', result.total)

    state.isLoading = false
  },

  async fetchProduct({ commit, state, getters }: any, id: any) {
    if (id === state.product.id) {
      return state.product
    }

    const product = getters.getProductById(id)

    if (product) {
      commit('SET_PRODUCT', product)
      return product
    } else {
      await $axios.$get(`/products/${id}`).then((response: { data: any }) => {
        commit('SET_PRODUCT', response.data)
        return response.data
      })
    }
  },

  async createProduct({ commit, state, dispatch }: any, product: any) {
    // Call mutations only inside current module not from another
    await $axios
      .$post('/products', product)
      .then((response: any) => {
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
      .catch((error: { message: any }) => {
        const notification = {
          type: 'danger',
          message: `There was an error creating product: ${error.message}`
        }
        dispatch('notification/add', notification, {
          root: true
        })
        throw error
      })
  },

  async filterProducts({ commit, state, dispatch }: any, query: any) {
    await $axios
      .$get(`/products?q=${query}`)
      .then((response: string | any[]) => {
        commit('SET_PRODUCTS_QUERY', response)
        commit('SET_PRODUCTS_QUERY_TOTAL_LENGTH', response.length)

        state.isLoading = false
      })
      .catch((error: { message: any }) => {
        const notification = {
          type: 'danger',
          message: `There was an error querying products: ${error.message}`
        }
        dispatch('notification/add', notification, {
          root: true
        })
      })
  }
}

export const getters = {
  getProductById: (state: any) => (id: any) => {
    return state.products.find(
      (product: { id: any }) => product && product.id === id
    )
  },

  getProductsInCart: (state: any) => {
    const productsInCart = state.products.filter(function(product: {
      added: any
      count: number
    }) {
      return product.added && product.count > 0
    })

    const total = productsInCart.reduce(
      (sum: any, current: { count: any }) => sum + current.count,
      0
    )
    return { products: productsInCart, total: total }
  }
}
