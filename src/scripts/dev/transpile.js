import { transform } from 'babel-core'

const transpile = (source) => {

  const transpiled = transform(source, {
    presets: [
      'babel-preset-es2015',
      'babel-preset-react',
      'babel-preset-stage-0'
    ],
    plugins: [
      'transform-promise-to-bluebird',
      ['transform-runtime', { polyfill: false }]
    ]
  })

  return transpiled.code

}

export default transpile
