import OptimizeCSSAssetsPlugin from 'optimize-css-assets-webpack-plugin'
import WorkboxPlugin from 'workbox-webpack-plugin'
import withLess from '@zeit/next-less'
import path from 'path'

module.exports = withLess({
  rewrites: async () => [
    { source: '/websites/:code/:permalink*', destination: '/page?code=:code&permalink=:permalink*'},
    { source: '/events/:code', destination: '/event?code=:code'},
    { source: '/forms/:code', destination: '/form?code=:code'},
    { source: '/stores/:code', destination: '/store?code=:code'}
  ],
  webpack: (config, {dev, isServer}) => {
    config.node.fs = 'empty'
    if(config.mode !== 'production') return config
    config.plugins.push(
      new WorkboxPlugin.InjectManifest({
        dontCacheBustURLsMatching: /^\/_next\/static\/.*/iu,
        exclude: [
          /^build-manifest\.json$/i,
          /^react-loadable-manifest\.json$/i,
          /\/_error\.js$/i,
          /\.js\.map$/i
        ],
        injectionPoint: 'self.__WB_MANIFEST',
        swSrc: path.join(__dirname,'src','sw.js'),
        swDest: path.join(__dirname,'public','sw.js'),
        modifyURLPrefix: {
          static: '/_next/static'
        }
      })
    )
    config.optimization.minimizer.push(
      new OptimizeCSSAssetsPlugin({})
    )
    return config
  }
})
