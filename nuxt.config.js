require('dotenv').config();

module.exports = {
  /*
   ** Headers of the page
   */
  head: {
    title: 'stripenetlify',
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
        content: 'Nuxt.js project'
      }
    ],
    link: [{
      rel: 'icon',
      type: 'image/x-icon',
      href: '/favicon.ico'
    }],
    script: [{
        src: 'https://checkout.stripe.com/checkout.js'
      }

    ]
  },
  mode: 'spa',
  /*
   ** Customize the progress bar color
   */
  loading: {
    color: '#3B8070'
  },
  env: {
    // TEST: process.env.STRIPE_SECRET_KEY,
    stripePublicKeyNuxt: process.env.STRIPE_PUBLISHABLE_KEY,
    lambdaEndpointNuxt: process.env.LAMBDA_ENDPOINT,
},
  // modules: [
  //   // Simple usage
  //   '@nuxtjs/dotenv',
  // ],
  /*
   ** Build configuration
   */
  build: {
    /*
     ** Run ESLint on save
     */
    extend(config, {
      isDev,
      isClient
    }) {
      if (isDev && isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }
    }
  }
}
