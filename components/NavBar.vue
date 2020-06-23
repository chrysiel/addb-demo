<template>
  <div id="nav" class="nav">
    <nuxt-link to="/" class="brand">
      My Shop
    </nuxt-link>

    <nav>
      <nuxt-link to="/cart">
        Cart <span class="cart-counter">({{ productsInCartTotalLength }})</span>
      </nuxt-link>
      &nbsp;|
      <nuxt-link to="/product/search">
        Search products
      </nuxt-link>

      <!-- <NuxtLink :to="$i18n.path('about')" class="Header__Link" exact>
            {{ $t('links.about') }}
          </NuxtLink>
        <NuxtLink
        v-if="$i18n.locale === 'en'"
        :to="`/fr` + $route.fullPath"
        class="Header__Link"
        active-class="none"
        exact
      >
        {{ $t('links.french') }}
      </NuxtLink>
      <NuxtLink
        v-else
        :to="$route.fullPath.replace(/^\/[^\/]+/, '')"
        class="Header__Link"
        active-class="none"
        exact
      >
        {{ $t('links.english') }}
      </NuxtLink> -->
    </nav>

    <nav>
      <a
        class="nav-link dropdown-toggle"
        data-toggle="dropdown"
        aria-haspopup="true"
        aria-expanded="false"
      >
        <span
          :class="{
            'flag-icon': true,
            'flag-icon-fr': $store.state.locale === 'fr',
            'flag-icon-us': $store.state.locale === 'en'
          }"
        ></span>
        {{
          $store.state.locale === 'fr'
            ? $t('links.french')
            : $t('links.english')
        }}
      </a>
      <div class="dropdown-menu" aria-labelledby="dropdown09">
        <a
          class="dropdown-item"
          @click="setLang($store.state.locale === 'fr' ? 'en' : 'fr')"
        >
          <span
            :class="{
              'flag-icon': true,
              'flag-icon-fr': $store.state.locale === 'en',
              'flag-icon-us': $store.state.locale === 'fr'
            }"
          ></span>
          {{
            $store.state.locale === 'fr'
              ? $t('links.english')
              : $t('links.french')
          }}
        </a>
      </div>
    </nav>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'NavBar',

  computed: mapState({
    productsInCartTotalLength: (state) =>
      state.product.productsInCartTotalLength
  }),

  methods: {
    async setLang(lang) {
      this.$root.$i18n.locale = lang
      // this.$store.state.locale = lang
      await this.$store.commit('SET_LANG', lang)
    }
  }
}
</script>

<style lang="scss" scoped>
#nav {
  display: flex;
  align-items: center;
  min-height: 50px;
  padding: 0.2em 1em;
  background: linear-gradient(to right, #16c0b0, #84cf6a);
}

.nav {
  justify-content: space-between;
}
.nav > .brand {
  font-family: 'Montserrat', sans-serif;
  font-weight: 700;
  font-size: 1.5em;
  text-decoration: none;
}
.nav .nav-item {
  box-sizing: border-box;
  margin: 0 5px;
  color: rgba(0, 0, 0, 0.5);
  text-decoration: none;
}
.nav .nav-item.router-link-exact-active {
  color: #39b982;
  border-bottom: solid 2px #39b982;
}

.nav-welcome {
  margin-left: auto;
  margin-right: 1rem;
  color: white;
}

a {
  font-weight: bold;
  color: #2c3e50;
  margin: auto 0.8em auto 0.4em;
  text-decoration: none;
  border-top: 2px solid transparent;
  border-bottom: 2px solid transparent;
}

.router-link-exact-active {
  color: white;
  border-bottom: 2px solid #fff;
}

button,
.button {
  margin-left: auto;
  background: white;
  text-decoration: none;
  color: #2c3e50;

  &.router-link-active {
    color: #2c3e50;
  }
}

.logoutButton {
  cursor: pointer;
}

.nav-welcome + button {
  margin-left: 0;
}
</style>
