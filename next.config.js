const { env } = require('process')
const commerce = require('./commerce.config.json')
const {
  withCommerceConfig,
  getProviderName,
} = require('./framework/commerce/config')

const provider = commerce.provider || getProviderName()
const isBC = provider === 'bigcommerce'
const isShopify = provider === 'shopify'

module.exports = withCommerceConfig({
  serverRuntimeConfig: {
    emailSubscribeUrl: env.EMAIL_SUBSCRIBE_URL,
  },
  publicRuntimeConfig: {
    // Will be available on both server and client
    sites: {
      international: {
        locale: 'en-US',
        name: 'International',
        defaultCurrency: 'USD',
        host: process.env.HOST_EN,
      },
      nz: {
        locale: 'en-NZ',
        defaultCurrency: 'ZND',
        name: 'New Zealand & AUSTRALIA',
        host: process.env.HOST_NZ,
      },
    },
  },
  future: {
    webpack5: true,
  },
  commerce,
  i18n: {
    locales: ['en-US', 'en-NZ'],
    defaultLocale: env.LOCALE,
    domains: [
      {
        domain: 'example.com',
        defaultLocale: 'en-US',
      },
      {
        domain: 'example.nz',
        defaultLocale: 'en-NZ',
        // an optional http field can also be used to test
        // locale domains locally with http instead of https
        http: true,
      },
    ],
  },
  images: {
    domains: [''],
  },
  target: 'serverless',
  rewrites() {
    return [
      (isBC || isShopify) && {
        source: '/checkout',
        destination: '/api/bigcommerce/checkout',
      },
      // The logout is also an action so this route is not required, but it's also another way
      // you can allow a logout!
      isBC && {
        source: '/logout',
        destination: '/api/bigcommerce/customers/logout?redirect_to=/',
      },
      // Rewrites for /search
      {
        source: '/search/designers/:name',
        destination: '/search',
      },
      {
        source: '/search/designers/:name/:category',
        destination: '/search',
      },
      {
        // This rewrite will also handle `/search/designers`
        source: '/search/:category',
        destination: '/search',
      },
    ].filter((x) => x)
  },
})

// Don't delete this console log, useful to see the commerce config in Vercel deployments
console.log('next.config.js', JSON.stringify(module.exports, null, 2))
