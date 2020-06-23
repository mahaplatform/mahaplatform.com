const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CopyPlugin = require('copy-webpack-plugin')
const autoprefixer = require('autoprefixer')
const webpack = require('webpack')
const cssnano = require('cssnano')
const path = require('path')

const root = path.resolve(__dirname,'..')
const src = path.join(root,'app')
const www = path.join(root,'www')
const dist = path.join(root,'dist','www')
const dest = process.env.NODE_ENV === 'production' ? dist : www

const config = {
  entry: {
    renderer: path.join(src,'renderer.js'),
    main: path.join(src,'main.js')
  },
  module: {
    rules: [
      {
        test: /\.less$/,
        exclude: /node_modules/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader?url=false',
          { loader: 'postcss-loader', options: {
            plugins: [autoprefixer, cssnano] }
          },
          'less-loader'
        ]
      }, {
        test: /\.js$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              cacheDirectory: path.join('tmp', '.cache'),
              presets: ['es2015', 'stage-0']
            }
          }
        ]
      }
    ]
  },
  mode: 'production',
  output: {
    path: dest,
    filename: '[name].js'
  },
  plugins: [
    new CopyPlugin(['package.json','index.html'].map(file => ({
      from: path.join(src,file),
      to: path.join(dest,file)
    }))),
    new MiniCssExtractPlugin({
      path: dest,
      filename: '[name].css'
    }),
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify(process.env.NODE_ENV),
        'API_HOST': JSON.stringify(process.env.API_HOST),
        'WEB_HOST': JSON.stringify(process.env.WEB_HOST),
        'ASSET_HOST': JSON.stringify(process.env.ASSET_HOST),
        'CDN_ASSET_HOST': JSON.stringify(process.env.CDN_ASSET_HOST)
      }
    })
  ],
  target: 'electron-renderer'
}

module.exports = config
