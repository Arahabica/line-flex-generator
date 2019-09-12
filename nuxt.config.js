import colors from 'vuetify/lib/util/colors'

const base = '/'
const title = 'LINE Flex Generator'
const description = 'LINEのFlexメッセージを生成することができます。'
const url = 'https://vuetifyjs.com'
const imageUrl = 'https://cdn.vuetifyjs.com/images/logos/vuetify-logo-300.png'
const twitterSite = '@Arahabica'

module.exports = {
  mode: 'universal',
  srcDir: 'src',
  router: { base },
  /*
   ** Headers of the page
   */
  head: {
    title,
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: description },

      { hid: 'og:title', name: 'og:title', content: title },
      { hid: 'og:type', name: 'og:type', content: 'website' },
      { hid: 'og:url', name: 'og:url', content: url },
      { hid: 'og:image', name: 'og:image', content: imageUrl },
      { hid: 'og:description', name: 'og:description', content: description },

      {
        hid: 'twitter:card',
        name: 'twitter:card',
        content: 'summary_large_image'
      },
      { hid: 'twitter:title', name: 'twitter:title', content: title },
      { hid: 'twitter:site', name: 'twitter:site', content: twitterSite },
      { hid: 'twitter:url', name: 'twitter:url', content: url },
      { hid: 'twitter:image', name: 'twitter:image', content: imageUrl },
      {
        hid: 'twitter:description',
        name: 'twitter:description',
        content: description
      }
    ],
    script: [
      { src: 'https://d.line-scdn.net/liff/1.0/sdk.js' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      {
        rel: 'stylesheet',
        href:
          'https://fonts.googleapis.com/css?family=Roboto:300,400,500,700|Material+Icons'
      }
    ]
  },
  /*
   ** Plugins to load before mounting the App
   */
  plugins: [{ src: '@/plugins/firebase' }, { src: '@/plugins/firestore' }],
  modules: ['@nuxtjs/vuetify'],
  /*
   ** Customize the progress bar color
   */
  loading: { color: '#3B8070' },
  /**
   * vuetify
   */
  vuetify: {
    theme: {
      themes: {
        light: {
          primary: colors.purple,
          secondary: colors.grey.darken1,
          accent: colors.shades.black,
          error: colors.red.accent3,
        },
        dark: {
          primary: colors.blue.lighten3,
        }
      }
    }
  },
  /*
   ** Build configuration
   */
  build: {
    /*
     ** Run ESLint on save
     */
    extend(config, { isDev, isClient }) {
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
