import { mount } from '@vue/test-utils'
import NavBar from '@/components/NavBar.vue'

describe('NavBar', () => {
  it('is a Vue component', () => {
    const wrapper = mount(NavBar)
    expect(wrapper.isVueInstance()).toBeTruthy()
  })

  it('nav must be visible', () => {
    const wrapper = mount(NavBar)
    expect(wrapper.find('div#nav').isVisible()).toBe(true)
  })

  it('Cart item counter must be visible', () => {
    const wrapper = mount(NavBar)
    expect(wrapper.find('span.cart-counter').isVisible()).toBe(true)
  })
})
