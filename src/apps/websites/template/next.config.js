import OptimizeCSSAssetsPlugin from 'optimize-css-assets-webpack-plugin'
import withLess from '@zeit/next-less'

module.exports = withLess({
  webpack: (config, {dev, isServer}) => {
    if(config.mode !== 'production') return
    config.optimization.minimizer.push(
      new OptimizeCSSAssetsPlugin({})
    )
  }
})
