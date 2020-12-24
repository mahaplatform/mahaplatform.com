import OptimizeCSSAssetsPlugin from 'optimize-css-assets-webpack-plugin'
import withLess from '@zeit/next-less'

module.exports = withLess({
  webpack: (config, {dev, isServer}) => {
    config.node.fs = 'empty'
    if(config.mode !== 'production') return config
    config.optimization.minimizer.push(
      new OptimizeCSSAssetsPlugin({})
    )
    return config
  }
})
