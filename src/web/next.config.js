import OptimizeCSSAssetsPlugin from 'optimize-css-assets-webpack-plugin'
import WorkboxPlugin from 'workbox-webpack-plugin'
import withLess from '@zeit/next-less'
import webpack from 'webpack'
import path from 'path'

module.exports = withLess({
  compress: false,
  rewrites: async () => [
    { source: '/websites/:code', destination: '/page?code=:code'},
    { source: '/websites/:code/index.maha', destination: '/page?code=:code'},
    { source: '/websites/:code/pages/:id', destination: '/page?code=:code&id=:id'},
    { source: '/websites/:code/:permalink*', destination: '/page?code=:code&permalink=:permalink*'},
    { source: '/events/:code', destination: '/event?code=:code'},
    { source: '/forms/:code', destination: '/form?code=:code'},
    { source: '/stores/:code', destination: '/store?code=:code'}
  ],
  webpack: (config, {dev, isServer}) => {
    config.node.fs = 'empty'
    config.plugins.push(
      new webpack.DefinePlugin({
        'process.env': {
          'ASSET_CDN_HOST': JSON.stringify(process.env.ASSET_CDN_HOST),
          'ADMIN_HOST': JSON.stringify(process.env.ADMIN_HOST)
        }
      })
    )

    if(config.mode === 'production') {
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
    }
    return config
  }
})
