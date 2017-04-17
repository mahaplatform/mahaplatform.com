var dotenv = require('dotenv')
dotenv.load()

const ExtractTextPlugin = require('extract-text-webpack-plugin')
const compile = require('maha/utils/compile')
const WriteIndex = require('maha/utils/write_index')
const webpack = require('webpack')

compile()

module.exports = {
  entry: {
    admin: './src/admin/index.js'
  },
  output: {
    path: './public',
    filename: 'js/[name]-[hash].min.js'
  },
  module: {
    noParse: /node_modules\/localforage\/dist\/localforage.js/,
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          presets: ['es2015','react','stage-0'],
          plugins: ['transform-flow-strip-types']
        }
      },
      {
        test: /\.less$/,
        loader: ExtractTextPlugin.extract('css-loader!less-loader')
      }
    ]
  },
  resolve: {
    modules: ['node_modules', 'src']
  },
  plugins: [
    new ExtractTextPlugin('css/[name]-[hash].min.css'),
    new WriteIndex(),
    new webpack.DefinePlugin({
      PRODUCTION: JSON.stringify(true),
      PLATFORM_DOMAIN: JSON.stringify(process.env.PLATFORM_DOMAIN)
    })
  ]
}
