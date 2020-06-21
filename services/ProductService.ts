import axios from 'axios'

const axiosConfig = {
  baseURL: 'http://localhost:3000',
  timeout: 0,
  withCredentials: false,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json'
    // "Authorization": 'Bearer ' + token
  }
  // httpAgent: new http.Agent({ keepAlive: true, rejectUnauthorized: false }),
  // httpsAgent: new https.Agent({ keepAlive: true, rejectUnauthorized: false })
}
const HTTP = axios.create(axiosConfig)

// Add a request interceptor
HTTP.interceptors.request.use(
  (config) => {
    // Do something before request is sent (this.$root.$data)
    // axios.defaults.headers.common['Authorization'] = 'Bearer ' + this.generateToken()
    // config.headers.Authorization = 'Bearer ' + this.generateToken()
    // console.log('ProductService Request Interceptor.', config)

    return config
  },
  (error) => {
    // Do something with request error
    return Promise.reject(error)
  }
)
// HTTP.interceptors.request.eject(requestInterceptor);

// Add a response interceptor
HTTP.interceptors.response.use(
  (response) => {
    // Do something with response data
    // console.log('ProductService Response Interceptor.', response)

    return response
  },
  (error) => {
    if (!error.response) {
      // console.log('Response Interceptor.', 'No response detected')
    }

    // Do something with response error
    return Promise.reject(error)
  }
)
// HTTP.interceptors.response.eject(responseInterceptor);

export default {
  getAllProducts() {
    return HTTP.get('/products')
  },

  getProducts(perPage: number, page: number) {
    return HTTP.get(`/products?_limit=${perPage}&_page=${page}`)
  },

  getProduct(id: any) {
    return HTTP.get(`/products/${id}`)
  },

  postProduct(product: any) {
    return HTTP.post('/products', product)
  },

  putProduct(id: any, product: any, action: string) {
    if (action === 'added') {
      product.count++
      if (!product.added) product.added = true
    } else {
      product.count--
      if (product.count === 0) product.added = false
    }
    return HTTP.put(`/products/${id}`, product)
  },

  filterProducts(query: any) {
    return HTTP.get(`/products?q=${query}`)
  }
}
