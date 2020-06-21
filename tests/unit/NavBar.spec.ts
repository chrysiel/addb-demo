/* eslint-disable import/first */
require('jsdom-global')()

import '@testing-library/jest-dom'
import { shallowMount, createLocalVue, RouterLinkStub } from '@vue/test-utils'
import Vuex from 'vuex'
import NavBar from '@/components/NavBar.vue'

const localVue = createLocalVue()

localVue.use(Vuex)

describe('NavBar component', () => {
  let actions
  let state
  let store: any

  beforeEach(() => {
    state = {
      product: { productsInCartTotalLength: 2 }
    }

    actions = {
      actionClick: jest.fn(),
      actionInput: jest.fn()
    }
    store = new Vuex.Store({
      state,
      actions
    })
  })

  it('is a Vue component', () => {
    const wrapper = shallowMount(NavBar, {
      store,
      localVue,
      stubs: {
        NuxtLink: RouterLinkStub
      }
    })
    expect(wrapper.exists()).toBeTruthy()
  })

  it('nav must be visible', () => {
    const wrapper = shallowMount(NavBar, {
      store,
      localVue,
      stubs: {
        NuxtLink: RouterLinkStub
      }
    })
    expect(wrapper.find('div#nav').element).toBeVisible()
  })

  it('Cart item counter must be visible', () => {
    const wrapper = shallowMount(NavBar, {
      store,
      localVue,
      stubs: {
        NuxtLink: RouterLinkStub
      }
    })
    expect(wrapper.find('span.cart-counter').element).toBeVisible()
  })

  it('Cart item counter must be equal to 2', () => {
    const wrapper = shallowMount(NavBar, {
      store,
      localVue,
      stubs: {
        NuxtLink: RouterLinkStub
      }
    })
    expect(wrapper.find('span.cart-counter').element).toHaveTextContent('(2)')
  })
})
