const webpack = require('webpack')
const path = require('path')
const babelrc = require('./babel.platform')

const root = path.resolve('src','platforms','desktop')
const src = path.join(root,'app')
const www = path.join(root,'www')
const dist = path.join(root,'dist','www')
const dest = process.env.NODE_ENV === 'production' ? dist : www

const config = {
  entry: {
    main: path.join(src,'main.js')
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              cacheDirectory: true,
              ...babelrc
            }
          }
        ]
      }
    ]
  },
  mode: 'production',
  output: {
    path: dest,
    filename: 'main.js'
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify(process.env.NODE_ENV),
        'API_HOST': JSON.stringify(process.env.API_HOST),
        'ADMIN_HOST': JSON.stringify(process.env.ADMIN_HOST),
        'ASSET_HOST': JSON.stringify(process.env.ASSET_HOST),
        'CDN_ASSET_HOST': JSON.stringify(process.env.CDN_ASSET_HOST)
      }
    })
  ],
  target: 'electron-main'
}

module.exports = config
