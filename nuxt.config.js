import ProductService from './services/ProductService.ts'

export default {
  mode: 'universal',
  router: {
    // base: '/app/',
    linkActiveClass: 'active-link'
  },
  /*
   ** Headers of the page
   */
  head: {
    title: process.env.npm_package_name || '',
    meta: [
      {
        charset: 'utf-8'
      },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1'
      },
      {
        hid: 'description',
        name: 'description',
        content: process.env.npm_package_description || ''
      }
    ],
    link: [
      {
        rel: 'icon',
        type: 'image/x-icon',
        href: '/favicon.ico'
      },
      {
        rel: 'stylesheet',
        type: 'text/css',
        href:
          'https://stackpath.bootstrapcdn.com/bootstrap/4.2.1/css/bootstrap.min.css'
      }
    ],
    script: [
      {
        src:
          'https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.6/umd/popper.min.js'
      },
      {
        src: 'https://code.jquery.com/jquery-3.3.1.slim.min.js'
      },
      {
        src:
          'https://stackpath.bootstrapcdn.com/bootstrap/4.2.1/js/bootstrap.min.js'
      }
    ]
  },
  /*
   ** Customize the progress-bar color
   */
  loading: {
    color: '#39b982'
  },
  /*
   ** Global CSS
   */
  css: ['~/assets/styles/main.css'],
  /*
   ** Plugins to load before mounting the App
   */
  plugins: ['~/plugins/axios-accessor.ts'],
  /*
   ** Nuxt.js dev-modules
   */
  buildModules: [
    // Doc: https://github.com/nuxt-community/eslint-module
    '@nuxtjs/eslint-module',
    '@nuxt/typescript-build'
  ],
  /*
   ** Nuxt.js modules
   */
  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios'
  ],
  /*
   ** Axios module configuration
   ** See https://axios.nuxtjs.org/options
   */
  axios: {
    baseURL: 'http://localhost:3000',
    timeout: 0,
    withCredentials: false,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
      // "Authorization": 'Bearer ' + token
    }
    // https: false
    // httpAgent: new http.Agent({ keepAlive: true, rejectUnauthorized: false }),
    // httpsAgent: new https.Agent({ keepAlive: true, rejectUnauthorized: false })
  },
  /*
   ** Build configuration
   */
  build: {
    /*
     ** You can extend webpack config here
     */
    extend(config, ctx) {
      // Exécuter ESLint lors de la sauvegarde
      if (ctx.isDev && ctx.isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }
    }
  },

  typescript: {
    typeCheck: {
      eslint: true,
      vue: true
    }
  },

  generate: {
    routes: () => {
      return ProductService.getAllProducts().then((response) => {
        return response.data.map((product) => {
          return '/product/' + product.id
        })
      })
    }
  }
}
