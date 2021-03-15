import MiniCssExtractPlugin from 'mini-css-extract-plugin'
import autoprefixer from 'autoprefixer'
import babelrc from './babel.frontend'
import webpack from 'webpack'
import cssnano from 'cssnano'
import path from 'path'

const webpackConfig = {
  devtool: 'none',
  entry: [
    path.resolve('src','sdk','index.js'),
    path.resolve('src','sdk','index.less')
  ],
  mode: 'development',
  module: {
    rules: [
      {
        test: /\.less$/,
        exclude: /node_modules/,
        use: [
          MiniCssExtractPlugin.loader,
          { loader: 'css-loader', options: {
            url: false, sourceMap: true }
          },
          { loader: 'postcss-loader', options: {
            plugins: [autoprefixer, cssnano] }
          },
          'less-loader'
        ]
      }, {
        test: /\.js$/,
        exclude: /(node_modules)/,
        loader: 'babel-loader',
        options: {
          cacheDirectory: true,
          ...babelrc
        }
      }
    ]
  },
  node: {
    fs: 'empty'
  },
  output: {
    path: path.resolve('src','public'),
    filename: path.join('maha.js'),
    publicPath: '/'
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'maha.css'
    }),
    new webpack.DefinePlugin({
      'process.env': {
        'ADMIN_HOST': JSON.stringify(process.env.ADMIN_HOST)
      }
    })
  ]
}

export default webpackConfig
