import HtmlWebpackExcludeAssetsPlugin from 'html-webpack-exclude-assets-plugin'
import MahaWebpackPlugin from '../../utils/maha_webpack_plugin'
import MiniCssExtractPlugin from 'mini-css-extract-plugin'
import TerserPlugin from 'terser-webpack-plugin'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import CopyWebpackPlugin from 'copy-webpack-plugin'
import { chunkTest, ruleTest } from './utils'
import autoprefixer from 'autoprefixer'
import webpack from 'webpack'
import cssnano from 'cssnano'
import path from 'path'

const webpackConfig = (apps, src, dest) => ({
  devtool: 'none',
  entry: {
    bundle: path.resolve('tmp', 'index.js'),
    style: path.resolve('tmp', 'index.less')
  },
  mode: 'production',
  module: {
    rules: [
      {
        test: ruleTest(/\.less$/),
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
        test: ruleTest(/\.js$/),
        loader: 'babel-loader',
        options: {
          cacheDirectory: true,
          presets: ['es2015', 'react', 'stage-0']
        }
      }
    ]
  },
  optimization: {
    minimizer: [
      new TerserPlugin({
        terserOptions: {
          mangle: true,
          safari10: true
        }
      })
    ],
    splitChunks: {
      cacheGroups: {
        commons: {
          test: chunkTest,
          name: 'vendors',
          chunks: 'all'
        }
      }
    }
  },
  output: {
    path: dest,
    filename: 'js/[name]-[chunkhash].min.js',
    publicPath: '/admin'
  },
  plugins: [
    new MahaWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: 'css/[name]-[hash].min.css'
    }),
    new CopyWebpackPlugin([
      { from: path.join(src, 'public'), to: dest }
    ]),
    new HtmlWebpackPlugin({
      template: path.join(src, 'index.html'),
      excludeAssets: [/style.*js$/]
    }),
    new HtmlWebpackExcludeAssetsPlugin(),
    new webpack.SourceMapDevToolPlugin({
      filename: '[file].map',
      exclude: [/(vendors|style)/]
    }),
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
        [app]: path.resolve('apps', app, 'src', 'client.js')
      }), {}),
      'maha-admin': path.resolve('apps', 'maha', 'src', 'client.js'),
      'maha-client': path.resolve('apps', 'maha', 'src', 'admin', 'index.js')
    }
  },
  resolveLoader: {
    modules: [
      path.resolve(__dirname, '..', '..', '..', 'node_modules')
    ]
  }
})

export default webpackConfig
