import OptimizeCSSAssetsPlugin from 'optimize-css-assets-webpack-plugin'
import withWorkbox  from 'next-with-workbox'
import withLess from '@zeit/next-less'

module.exports = withWorkbox(withLess({
  workbox: {
    swSrc: 'src/sw.js',
    injectionPoint: 'self.__WB_MANIFEST'
  },
  webpack: (config, {dev, isServer}) => {
    config.node.fs = 'empty'
    if(config.mode !== 'production') return config
    config.optimization.minimizer.push(
      new OptimizeCSSAssetsPlugin({})
    )
    return config
  }
}))
