import HtmlWebpackExcludeAssetsPlugin from 'html-webpack-exclude-assets-plugin'
import MiniCssExtractPlugin from 'mini-css-extract-plugin'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import CopyWebpackPlugin from 'copy-webpack-plugin'
import TerserPlugin from 'terser-webpack-plugin'
import autoprefixer from 'autoprefixer'
import MahaPlugin from './maha_plugin'
import webpack from 'webpack'
import cssnano from 'cssnano'
import path from 'path'

const webpackConfig = {
  devtool: 'none',
  entry: [
    path.resolve('src','web','core','admin','index.js'),
    path.resolve('src','web','core','admin','index.less')
  ],
  mode: 'production',
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
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'all'
        }
      }
    }
  },
  output: {
    path: path.resolve('dist.staged','public', 'admin'),
    filename: 'js/[name]-[chunkhash].min.js',
    publicPath: '/admin'
  },
  plugins: [
    new MahaPlugin(),
    new MiniCssExtractPlugin({
      filename: 'css/[name]-[hash].min.css'
    }),
    new CopyWebpackPlugin([{
      from: path.resolve('src','web','core','admin','public'),
      to: path.resolve('dist.staged','public','admin')
    }]),
    new HtmlWebpackPlugin({
      template: path.resolve('src','web','core','admin','index.html')
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
      'maha-admin': path.resolve('src','web','core','admin','client.js')
    }
  },
  resolveLoader: {
    modules: [
      path.resolve('node_modules')
    ]
  }
}

export default webpackConfig
