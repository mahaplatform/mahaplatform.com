import MahaWebpackPlugin from './maha_webpack_plugin'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import autoprefixer from 'autoprefixer'
import webpack from 'webpack'
import cssnano from 'cssnano'
import path from 'path'

const webpackConfig = (apps) => ({
  devtool: 'cheap-module-eval-source-map',
  entry: [
    `webpack-dev-server/client?http://localhost:${process.env.DEVSERVER_PORT}`,
    'webpack/hot/only-dev-server',
    path.resolve('tmp', 'index.js'),
    path.resolve('tmp', 'index.less')
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
  output: {
    path: path.resolve('src','apps','maha','admin','public'),
    filename: 'application.js',
    publicPath: '/admin'
  },
  plugins: [
    new MahaWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: path.join('src','apps','maha','admin','index.html')
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        'DOMAIN': JSON.stringify(process.env.DOMAIN || 'localhost'),
        'DEVSERVER_PORT': JSON.stringify(process.env.DEVSERVER_PORT),
        'SERVER_PORT': JSON.stringify(process.env.SERVER_PORT),
        'SOCKET_PORT': JSON.stringify(process.env.SOCKET_PORT),
        'FCM_API_KEY': JSON.stringify(process.env.FCM_API_KEY),
        'FCM_MESSAGE_SENDER_ID': JSON.stringify(process.env.FCM_MESSAGE_SENDER_ID),
        'VAPID_PUBLIC_KEY': JSON.stringify(process.env.VAPID_PUBLIC_KEY),
        'GOOGLE_TRACKING_ID': JSON.stringify(process.env.GOOGLE_TRACKING_ID || ''),
        'WEB_HOST': JSON.stringify(process.env.WEB_HOST),
        'WEB_ASSET_CDN_HOST': JSON.stringify(process.env.WEB_ASSET_CDN_HOST),
        'DATA_ASSET_CDN_HOST': JSON.stringify(process.env.DATA_ASSET_CDN_HOST),
        'WEB_ASSET_HOST': JSON.stringify(process.env.WEB_ASSET_HOST),
        'DATA_ASSET_HOST': JSON.stringify(process.env.DATA_ASSET_HOST),
        'ROLLBAR_CLIENT_TOKEN': JSON.stringify(process.env.ROLLBAR_CLIENT_TOKEN)
      }
    })
  ],
  resolve: {
    alias: {
      ...apps.reduce((aliases, app) => ({
        ...aliases,
        [app]: path.resolve('src','apps',app,'client.js')
      }), {}),
      'reframe': path.resolve('src','packages','reframe','index.js'),
      'maha-admin': path.resolve('src','apps','maha','client.js'),
      'maha-client': path.resolve('src','apps','maha','admin','index.js')
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
