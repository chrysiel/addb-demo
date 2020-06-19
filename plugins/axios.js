export default function({ $axios, redirect }) {
  $axios.onRequest((config) => {
    /* // Set baseURL (both client and server)
    this.$axios.setBaseURL('http://api.example.com')
    // Adds header: `Content-Type: application/x-www-form-urlencoded` to only post requests
    this.$axios.setHeader('Content-Type', 'application/x-www-form-urlencoded', [
      'post'
    ])
    // Adds header: `Authorization: Bearer 123` to only post and delete requests
    this.$axios.setToken('123', 'Bearer', ['post', 'delete'])
    // Removes default Authorization header from `common` scope (all requests)
    this.$axios.setToken(false) */
    // console.log('Request Interceptor.', config)
  })

  $axios.onResponse((response) => {
    // console.log('Response Interceptor.', response)
  })

  /* $axios.onError((error) => {
    if (error.response.status === 500) {
      redirect('/sorry')
    }
    return Promise.reject(error)
  })

  $axios.onRequestError((error) => {
    // console.log('Request Interceptor.', error)
  })

  $axios.onResponseError((error) => {
    // console.log('Response Interceptor.', error)
  }) */
}
