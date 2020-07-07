export default {
  mode: 'universal',
  env: {
    baseUrl: 'http://localhost:3000',
    backendUrl: 'http://localhost:3000/api'
  },
  /*
   ** Headers of the page
   */
  head: {
    title: process.env.npm_package_name || '',
    meta: [{
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
    link: [{
      rel: 'icon',
      type: 'image/x-icon',
      href: '/favicon.ico'
    }],
    script: [{}]
  },
  /*
   ** Customize the progress-bar color
   */
  loading: {
    color: '#fff'
  },
  /*
   ** Global CSS
   */
  css: [],
  /*
   ** Plugins to load before mounting the App
   */
  plugins: [],
  /*
   ** Nuxt.js dev-modules
   */
  buildModules: [
    '@nuxtjs/vuetify',
  ],
  /*
   ** Nuxt.js modules
   */
  modules: [
    '@nuxtjs/axios',
    '@nuxtjs/auth',
    '@nuxtjs/toast',
    '@nuxtjs/proxy',
  ],
  /*
   ** Build configuration
   */
  build: {
    /*
     ** You can extend webpack config here
     */
    extend(config, ctx) {},
    // analyze: true,
    // extractCSS: true
  },

  // Axios config
  axios: {
    baseURL: "http://localhost:3000/api",
  },

  // Auth Module Configs
  auth: {
    strategies: {
      local: {
        endpoints: {
          login: {
            url: '/user/login',
            method: 'post',
            propertyName: 'jwt'
          },
          logout: false,
          user: {
            url: '/user/me',
            method: 'get',
            propertyName: false
          }
        }
      }
    }
  },

  // Toast Module Configs
  toast: {
    duration: 5000
  },

  // Proxy Options
  proxy: {
    '/api': {
      target: 'http://localhost:5000',
      pathRewrite: {
        '^/api': '/'
      }
    }
  }
}
