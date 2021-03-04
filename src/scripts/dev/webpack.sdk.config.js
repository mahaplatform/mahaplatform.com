import MiniCssExtractPlugin from 'mini-css-extract-plugin'
import autoprefixer from 'autoprefixer'
import babel from './webpack.babel'
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
          ...babel
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
        'WEB_HOST': JSON.stringify(process.env.WEB_HOST)
      }
    })
  ]
}

export default webpackConfig
