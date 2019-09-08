import HtmlWebpackExcludeAssetsPlugin from 'html-webpack-exclude-assets-plugin'
import MiniCssExtractPlugin from 'mini-css-extract-plugin'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import TerserPlugin from 'terser-webpack-plugin'
import autoprefixer from 'autoprefixer'
import cssnano from 'cssnano'
import path from 'path'

const webpackConfig = {
  devtool: 'none',
  entry: [
    path.resolve('src','web','core','designer','index.js'),
    path.resolve('src','web','core','designer','index.less')
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
            url: false, sourceMap: false }
          },
          { loader: 'postcss-loader', options: {
            plugins: [autoprefixer, cssnano] }
          },
          'less-loader'
        ]
      }, {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        options: {
          cacheDirectory: true,
          presets: ['es2015', 'react', 'stage-0']
        }
      }
    ]
  },
  node: {
    fs: 'empty'
  },
  optimization: {
    minimizer: [
      new TerserPlugin({
        terserOptions: {
          mangle: true,
          safari10: true
        }
      })
    ]
  },
  output: {
    path: path.resolve('src','web','core','admin','public'),
    filename: 'js/designer.min.js',
    publicPath: '/admin'
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'css/designer.min.css'
    }),
    new HtmlWebpackPlugin({
      template: path.resolve('src','web','core','designer','index.html'),
      filename: 'designer.html'
    }),
    new HtmlWebpackExcludeAssetsPlugin()
  ]
}

export default webpackConfig
