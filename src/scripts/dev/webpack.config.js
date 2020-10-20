import HtmlWebpackPlugin from 'html-webpack-plugin'
import autoprefixer from 'autoprefixer'
import webpack from 'webpack'
import cssnano from 'cssnano'
import path from 'path'
import fs from 'fs'

const webpackConfig = (app, name, root, port) => ({
  devtool: 'none',
  entry: [
    `webpack-dev-server/client?${process.env.WEB_HOST}`,
    'webpack/hot/only-dev-server',
    path.resolve(root,'index.js'),
    ...fs.existsSync(path.resolve(root,'index.less')) ? [
      path.resolve(root,'index.less')
    ] : []
  ],
  mode: 'development',
  module: {
    rules: [
      {
        test: /\.less$/,
        exclude: /(node_modules)/,
        use: [
          'style-loader',
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
        exclude: /(node_modules)/,
        loader: 'babel-loader',
        options: {
          cacheDirectory: true,
          plugins: ['react-hot-loader/babel'],
          presets: ['es2015', 'react', 'stage-0']
        }
      }
    ]
  },
  node: {
    fs: 'empty'
  },
  output: {
    path: path.resolve('src','public'),
    filename: path.join('js','[name].js'),
    publicPath: `/apps/${app}/${name}/`
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    ...fs.existsSync(path.resolve(root,'index.html')) ? [
      new HtmlWebpackPlugin({
        template: path.resolve(root,'index.html'),
        filename: 'index.html'
      })
    ] : [],
    new webpack.DefinePlugin({
      'process.env': {
        'GOOGLE_MAPS_API_KEY': JSON.stringify(process.env.GOOGLE_MAPS_API_KEY || ''),
        'GOOGLE_TRACKING_ID': JSON.stringify(process.env.GOOGLE_TRACKING_ID || ''),
        'GOOGLEPAY_ENVIRONMENT': JSON.stringify(process.env.GOOGLEPAY_ENVIRONMENT || ''),
        'GOOGLEPAY_MERCHANTID': JSON.stringify(process.env.GOOGLEPAY_MERCHANTID || ''),
        'PAYPAL_ENVIRONMENT': JSON.stringify(process.env.PAYPAL_ENVIRONMENT || ''),
        'RECAPTCHA_SITE_KEY': JSON.stringify(process.env.RECAPTCHA_SITE_KEY || ''),
        'ROLLBAR_CLIENT_TOKEN': JSON.stringify(process.env.ROLLBAR_CLIENT_TOKEN),
        'WEB_ASSET_CDN_HOST': JSON.stringify(process.env.WEB_ASSET_CDN_HOST),
        'WEB_HOST': JSON.stringify(process.env.WEB_HOST)
      }
    })
  ],
  resolve: {
    alias: {
      'maha-client': path.resolve('src','core','client','index.js'),
      'maha-public': path.resolve('src','core','public','client.js')
    },
    modules: [
      path.resolve('node_modules')
    ]
  },
  resolveLoader: {
    modules: [
      path.resolve('node_modules')
    ]
  }
})

export default webpackConfig
