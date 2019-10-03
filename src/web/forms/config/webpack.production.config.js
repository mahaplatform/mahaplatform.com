import MiniCssExtractPlugin from 'mini-css-extract-plugin'
import TerserPlugin from 'terser-webpack-plugin'
import autoprefixer from 'autoprefixer'
import cssnano from 'cssnano'
import path from 'path'

const webpackConfig = (name, css) => ({
  devtool: 'none',
  entry: [
    path.resolve('src','web','forms',name,'index.js'),
    ...css ? [path.resolve('src','web','forms',name,'index.less')] : []
  ],
  mode: 'development',
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
    path: path.resolve('dist.staged','public'),
    filename: 'forms/js/[name]-[chunkhash].min.js',
    publicPath: '/'
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: `forms/css/${name}.css`
    })
  ]
})

export const designerConfig = webpackConfig('designer', false)

export const embedConfig = webpackConfig('embed', false)

export const formConfig = webpackConfig('form', true)
