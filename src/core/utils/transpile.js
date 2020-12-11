import { transform } from '@babel/core'
import path from 'path'

const getBabelRc = () => {
  const babelrc = path.join(__dirname,'babel.config.js')
  const config = require(babelrc)
  return config
}

const babelrc = getBabelRc()

const transpile = (source) => {

  const transpiled = transform(source, babelrc)

  return transpiled.code

}

export default transpile
