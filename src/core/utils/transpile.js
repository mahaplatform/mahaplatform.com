import { transform } from '@babel/core'
import path from 'path'
import fs from 'fs'

const getBabelRc = () => {
  const babelrc = path.join('.babelrc')
  const config = fs.readFileSync(babelrc, 'utf8')
  return JSON.parse(config)
}

const babelrc = getBabelRc()

const transpile = (source) => {

  const transpiled = transform(source, babelrc)

  return transpiled.code

}

export default transpile
