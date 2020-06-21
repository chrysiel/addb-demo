/* eslint-disable import/first */
require('jsdom-global')()

import { createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'
import { cloneDeep } from 'lodash'
import * as ProductStore from '@/store/product'

describe('Product Store Testing', () => {
  const products = [
    {
      id: 5928101,
      image:
        'https://store.storeimages.cdn-apple.com/4668/as-images.apple.com/is/macbook-air-gold-select-201810?wid=892&hei=820&&qlt=80&.v=1541713859040',
      title: 'MacBook Air 13 pouces',
      description:
        'Processeur Core i3 bicœur à 1,1 GHz (Turbo Boost jusqu’à 3,2 GHz) 256 Go de stockage Touch ID',
      added: true,
      count: 1
    },
    {
      id: 8419988,
      image:
        'https://media.ldlc.com/r1600/ld/products/00/05/27/25/LD0005272599_2_0005272619.jpg',
      title: 'Apple iPad Air(2019) Wi - Fi 256 Go Argent',
      description:
        "Non, la puissance n'est plus le privilège des pros ! Désormais, avec l'iPad Air, les technologies les plus avancées sont accessibles au plus grand ...",
      added: true,
      count: 3
    },
    {
      id: 4582797,
      image:
        'https://dyw7ncnq1en5l.cloudfront.net/optim/produits/38/50215/acer-chromebook-514_9bbce87714a445d8__908_512__overflow.jpg',
      title: 'Acer Chromebook 514',
      description:
        'Cela faisait longtemps qu’un Chromebook ne s’était pas frayé un chemin vers le labo des Numériques. C’est chose faite aujourd’hui, puisque nous ...',
      added: false,
      count: 0
    }
  ]

  it('Get all products', () => {
    const localVue = createLocalVue()
    localVue.use(Vuex)
    const store = new Vuex.Store(cloneDeep(ProductStore))

    expect(store.state.productsTotalLength).toBe(0)
    store.commit('SET_PRODUCTS', products)
    store.commit('SET_PRODUCTS_TOTAL_LENGTH', products.length)
    // store.dispatch('fetchAllProducts')

    expect(store.state.productsTotalLength).toBe(3)
  })

  it('Get products in cart', () => {
    const localVue = createLocalVue()
    localVue.use(Vuex)
    const store = new Vuex.Store(cloneDeep(ProductStore))

    store.commit('SET_PRODUCTS', products)
    store.commit('SET_PRODUCTS_TOTAL_LENGTH', products.length)
    // store.dispatch('fetchProductsInCart')

    expect(store.getters.getProductsInCart.total).toBe(4)
  })

  it('Add product in cart', () => {
    const localVue = createLocalVue()
    localVue.use(Vuex)
    const store = new Vuex.Store(cloneDeep(ProductStore))

    store.commit('SET_PRODUCTS', products)
    store.commit('SET_PRODUCTS_TOTAL_LENGTH', products.length)
    // store.dispatch('fetchProductsInCart')
    store.commit('updateProduct', {
      product: products[2],
      action: 'added'
    })
    expect(store.getters.getProductsInCart.total).toBe(5)
  })

  it('Remove product in cart', () => {
    const localVue = createLocalVue()
    localVue.use(Vuex)
    const store = new Vuex.Store(cloneDeep(ProductStore))

    store.commit('SET_PRODUCTS', products)
    store.commit('SET_PRODUCTS_TOTAL_LENGTH', products.length)
    // store.dispatch('fetchProductsInCart')
    store.commit('updateProduct', {
      product: products[1],
      action: 'removed'
    })

    expect(store.getters.getProductsInCart.total).toBe(4)
  })
})
