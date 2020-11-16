require('../core/services/environment')
const withLess = require('@zeit/next-less')
const path = require('path')

module.exports = withLess({
  distDir: 'dist',
  webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
    config.module.rules.push({
      test: /\.js$/,
      loader: 'babel-loader',
      include: path.join(__dirname,'..','client'),
      options: {
        cacheDirectory: true,
        presets: ['es2015', 'react', 'stage-0']
      }
    })
    config.resolve.alias['@client'] = path.join(__dirname,'..','client')
    config.plugins.push(new webpack.DefinePlugin({
      'process.env': {
        'GOOGLE_MAPS_API_KEY': JSON.stringify(process.env.GOOGLE_MAPS_API_KEY || ''),
        'GOOGLE_TRACKING_ID': JSON.stringify(process.env.GOOGLE_TRACKING_ID || ''),
        'GOOGLEPAY_ENVIRONMENT': JSON.stringify(process.env.GOOGLEPAY_ENVIRONMENT || ''),
        'GOOGLEPAY_MERCHANTID': JSON.stringify(process.env.GOOGLEPAY_MERCHANTID || ''),
        'PAYPAL_ENVIRONMENT': JSON.stringify(process.env.PAYPAL_ENVIRONMENT || ''),
        'RECAPTCHA_SITE_KEY': JSON.stringify(process.env.RECAPTCHA_SITE_KEY || ''),
        'ROLLBAR_CLIENT_TOKEN': JSON.stringify(process.env.ROLLBAR_CLIENT_TOKEN),
        'WEB_ASSET_CDN_HOST': JSON.stringify(process.env.WEB_ASSET_CDN_HOST),
        'WEB_HOST': JSON.stringify(process.env.WEB_HOST)
      }
    }))
    return config
  },
  async rewrites() {
    return [
      { source: '/foo', destination: '/1' },
      { source: '/foobar', destination: '/1' },
      { source: '/bar', destination: '/2' },
      { source: '/baz', destination: '/3' }
    ]
  },
  target: 'server'
})
