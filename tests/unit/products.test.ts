import _ from 'lodash'
import Vuex from 'vuex'
import { createLocalVue } from '@vue/test-utils'

describe('store/product', () => {
  // ----------------------------------------------------
  // focus on the code from here...
  const localVue = createLocalVue()
  localVue.use(Vuex)
  let NuxtStore: { createStore: () => any }
  let store: { getters: { [x: string]: any } }

  beforeAll(async () => {
    // note the store will mutate across tests
    const storePath = `${process.env.buildDir}/store.js`
    NuxtStore = await import(storePath)
  })

  beforeEach(async () => {
    store = await NuxtStore.createStore()
  })
  // ...to here is what matters
  // ----------------------------------------------------

  describe('disney', () => {
    let disney: string | any[]

    beforeEach(() => {
      disney = store.getters['movies/disney']
    })

    it('getter is a function', () => {
      expect(_.isArray(disney)).toBe(true)
    })

    it('should be 6 movies total', () => {
      expect(disney.length).toBe(6)
    })
  })

  describe('byStudio', () => {
    let byStudio: (arg0: string) => { (): any; new (): any; length: any }

    beforeEach(() => {
      byStudio = store.getters['movies/byStudio']
    })

    it('is a function', () => {
      expect(_.isFunction(byStudio)).toBe(true)
    })

    it('matches what the disney getter returns', () => {
      const movies = store.getters['movies/byStudio']('Disney')
      const disney = store.getters['movies/disney']
      expect(movies).toEqual(disney)
    })

    it('shows all other studios with one entry each', () => {
      expect(byStudio('sony').length).toBe(1)
      expect(byStudio('warner bros.').length).toBe(1)
      expect(byStudio('universal').length).toBe(1)
      expect(byStudio('beijing enlight').length).toBe(1)
    })
  })
})
