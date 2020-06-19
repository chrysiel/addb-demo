import { mount } from '@vue/test-utils'
import NavBar from './components/NavBar.vue'

describe('NavBar', () => {
  test('nav must be visible', () => {
    const wrapper = mount(NavBar)
    expect(wrapper.find('div#nav').isVisible()).toBe(true)
  })

  test('Cart item counter must be visible', () => {
    const wrapper = mount(NavBar)
    expect(wrapper.find('span.cart-counter').isVisible()).toBe(true)
  })
})
