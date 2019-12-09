import HtmlWebpackPlugin from 'html-webpack-plugin'
import autoprefixer from 'autoprefixer'
import webpack from 'webpack'
import cssnano from 'cssnano'
import path from 'path'
import fs from 'fs'

const webpackConfig = (app, name, root, port) => ({
  devtool: 'none',
  entry: [
    `webpack-dev-server/client?https://localhost:${port}`,
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
    publicPath: `/${app}/${name}/`
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    ...fs.existsSync(path.resolve(root,'index.html')) ? [
      new HtmlWebpackPlugin({
        template: path.resolve(root,'index.html'),
        filename: 'index.html'
      })
    ] : []
  ]
})

export default webpackConfig