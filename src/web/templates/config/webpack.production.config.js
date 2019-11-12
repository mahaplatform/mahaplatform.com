import MiniCssExtractPlugin from 'mini-css-extract-plugin'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import TerserPlugin from 'terser-webpack-plugin'
import autoprefixer from 'autoprefixer'
import cssnano from 'cssnano'
import path from 'path'

const webpackConfig = (name) => ({
  devtool: 'none',
  entry: [
    path.resolve('src','web','templates',name,'index.js'),
    path.resolve('src','web','templates',name,'index.less')
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
    path: path.resolve('dist.staged','public'),
    filename: 'templates/js/[name]-[chunkhash].min.js',
    publicPath: '/'
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: `templates/css/${name}.css`
    }),
    new HtmlWebpackPlugin({
      template: path.resolve('src','web','templates',name,'index.html'),
      filename: `templates/${name}.html`
    })
  ]
})

export const documentConfig = webpackConfig('document')

export const emailConfig = webpackConfig('email')

export const formConfig = webpackConfig('form')

export const webConfig = webpackConfig('web')
