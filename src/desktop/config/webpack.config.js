import MiniCssExtractPlugin from 'mini-css-extract-plugin'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import autoprefixer from 'autoprefixer'
import webpack from 'webpack'
import cssnano from 'cssnano'
import path from 'path'

const config = {
  entry: [
    path.resolve('src','desktop','app','index.js'),
    path.resolve('src','desktop','app','index.less')
  ],
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
    path: path.resolve('src','desktop','www'),
    filename: path.join('index.js')
  },
  plugins: [
    new MiniCssExtractPlugin({
      path: path.resolve('src','desktop','www'),
      filename: path.join('index.css')
    }),
    new HtmlWebpackPlugin({
      template: path.resolve('src','desktop','app','index.html')
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

export default config
