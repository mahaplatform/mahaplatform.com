import HtmlWebpackExcludeAssetsPlugin from 'html-webpack-exclude-assets-plugin'
import MiniCssExtractPlugin from 'mini-css-extract-plugin'
import GitRevisionPlugin from 'git-revision-webpack-plugin'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import CopyWebpackPlugin from 'copy-webpack-plugin'
import TerserPlugin from 'terser-webpack-plugin'
import autoprefixer from 'autoprefixer'
import babel from './webpack.babel'
import webpack from 'webpack'
import cssnano from 'cssnano'
import path from 'path'

const gitRevisionPlugin = new GitRevisionPlugin()

const webpackConfig = {
  devtool: false,
  entry: [
    path.resolve('src','admin','index.js'),
    path.resolve('src','admin','index.less')
  ],
  externals: ['canvas'],
  mode: 'production',
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
        test: /^caman$/,
        use: 'imports-loader?exports=>undefined,require=>false,this=>window'
      }, {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
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
  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin({
        terserOptions: {
          mangle: true,
          safari10: true,
          ie8: true
        },
        parallel: 2,
        sourceMap: true
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
    path: path.resolve('dist.staged','public'),
    filename: 'js/[name]-[chunkhash].min.js',
    publicPath: process.env.ASSET_CDN_HOST
  },
  plugins: [
    gitRevisionPlugin,
    new MiniCssExtractPlugin({
      filename: 'css/[name]-[hash].min.css'
    }),
    new CopyWebpackPlugin([{
      from: path.resolve('src','public'),
      to: path.resolve('dist.staged','public')
    }]),
    new HtmlWebpackPlugin({
      template: path.resolve('src','admin','index.html')
    }),
    new HtmlWebpackExcludeAssetsPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        'DATA_ASSET_CDN_HOST': JSON.stringify(process.env.DATA_ASSET_CDN_HOST),
        'DATA_ASSET_HOST': JSON.stringify(process.env.DATA_ASSET_HOST),
        'DEVSERVER_PORT': JSON.stringify(process.env.DEVSERVER_PORT),
        'DOMAIN': JSON.stringify(process.env.DOMAIN || 'localhost'),
        'ENVIRONMENT_WARNING': JSON.stringify(process.env.ENVIRONMENT_WARNING),
        'FIREBASE_API_KEY': JSON.stringify(process.env.FIREBASE_API_KEY),
        'FIREBASE_APP_ID': JSON.stringify(process.env.FIREBASE_APP_ID),
        'FIREBASE_MESSAGE_SENDER_ID': JSON.stringify(process.env.FIREBASE_MESSAGE_SENDER_ID),
        'FIREBASE_PROJECT_ID': JSON.stringify(process.env.FIREBASE_PROJECT_ID),
        'FIREBASE_WEB_PUSH_PUBLIC_KEY': JSON.stringify(process.env.FIREBASE_WEB_PUSH_PUBLIC_KEY),
        'GIT_VERSION': JSON.stringify(gitRevisionPlugin.version()),
        'GOOGLE_MAPS_API_KEY': JSON.stringify(process.env.GOOGLE_MAPS_API_KEY || ''),
        'GOOGLE_TRACKING_ID': JSON.stringify(process.env.GOOGLE_TRACKING_ID || ''),
        'GOOGLEPAY_ENVIRONMENT': JSON.stringify(process.env.GOOGLEPAY_ENVIRONMENT || ''),
        'GOOGLEPAY_MERCHANTID': JSON.stringify(process.env.GOOGLEPAY_MERCHANTID || ''),
        'PAYPAL_ENVIRONMENT': JSON.stringify(process.env.PAYPAL_ENVIRONMENT || ''),
        'ROLLBAR_CLIENT_TOKEN': JSON.stringify(process.env.ROLLBAR_CLIENT_TOKEN),
        'SERVER_PORT': JSON.stringify(process.env.SERVER_PORT),
        'ASSET_CDN_HOST': JSON.stringify(process.env.ASSET_CDN_HOST),
        'ASSET_HOST': JSON.stringify(process.env.ASSET_HOST),
        'ADMIN_HOST': JSON.stringify(process.env.ADMIN_HOST)
      }
    }),
    new webpack.SourceMapDevToolPlugin({
      publicPath: `${process.env.ASSET_CDN_HOST}/`,
      filename: '[file].map',
      columns: true
    })
  ],
  resolve: {
    alias: {
      '@apps': path.resolve('src','apps'),
      '@core': path.resolve('src','core'),
      '@admin': path.resolve('src','lib','admin')
    }
  },
  resolveLoader: {
    modules: [
      path.resolve('node_modules')
    ]
  }
}

export default webpackConfig
