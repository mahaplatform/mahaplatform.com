import MiniCssExtractPlugin from 'mini-css-extract-plugin'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import TerserPlugin from 'terser-webpack-plugin'
import autoprefixer from 'autoprefixer'
import webpack from 'webpack'
import cssnano from 'cssnano'
import path from 'path'
import fs from 'fs'

const webpackConfig = (app, name, root, port) => ({
  devtool: 'none',
  entry: [
    path.resolve(root,'index.js'),
    ...fs.existsSync(path.resolve(root,'index.less')) ? [
      path.resolve(root,'index.less')
    ] : []
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
    path: path.resolve('dist.staged','public','apps',app,name),
    ...fs.existsSync(path.resolve(root,'index.html')) ? {
      filename: path.join('js', '[name]-[chunkhash].js')
    } : {
      filename: path.join('js', '[name].js')
    },
    publicPath: `${process.env.WEB_ASSET_CDN_HOST}/apps/${app}/${name}/`
  },
  plugins: [
    ...fs.existsSync(path.resolve(root,'index.less')) ? [
      new MiniCssExtractPlugin({
        filename: path.join('css','[name]-[chunkhash].css')
      })
    ] : [],
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
