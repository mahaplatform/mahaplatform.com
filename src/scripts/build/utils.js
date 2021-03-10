import '@core/services/environment'
import { transform } from '@babel/core'
import mkdirp from 'mkdirp'
import path from 'path'
import _ from 'lodash'
import ncp from 'ncp'
import fs from 'fs'

const jswhitelist = ['mt.js']

const dist = path.resolve('dist')

const staged = `${dist}.staged`

const copy = Promise.promisify(ncp)

const getItemType = (item) => {
  return path.extname(item).length > 0 ? path.extname(item).substr(1) : 'dir'
}

const getItem = (src, root, item) => ({
  src,
  type: getItemType(item)
})

const listContents = (src, root, item) => [
  getItem(src, root, item),
  ...fs.lstatSync(src).isDirectory() ? listItems(src) : []
]

const listItems = (root) => fs.readdirSync(root).reduce((items, item) => [
  ...items,
  ...listContents(path.join(root, item), root, item)
], []).filter(item => {
  if(item.src.match(/\.git/)) return false
  if(item.src.match(/\.DS_Store/)) return false
  if(item.src.match(/_test.js$/)) return false
  if(item.src.match(/apps\/[^/]*\/admin\/(activities|badges|components|roots|tokens|views)/)) return false
  return true
})

const transpileFile = (src, dest, babelrc) => {
  const source = fs.readFileSync(src, 'utf8')
  const transpiled = transform(source, {
    ...babelrc,
    filename: path.basename(src)
  })
  fs.writeFileSync(dest, transpiled.code)
}

const buildItem = async (item, srcPath, destPath, babelrc) => {
  const dest = item.src.replace(srcPath, destPath)
  const file = path.basename(item.src)
  if(!_.includes(jswhitelist, file) && item.type === 'js') return transpileFile(item.src, dest, babelrc)
  if(item.type === 'dir') return mkdirp.sync(dest)
  return await copy(item.src, dest)
}

export const buildEntry = async (entry, babelrc) => {
  const srcPath = path.resolve('src',entry)
  const destPath = path.join(staged,'platform',entry)
  await transpileFile(srcPath, destPath, babelrc)
}

export const buildDir = async (dir, babelrc) => {
  const srcPath = path.resolve('src',dir)
  const destPath = path.join(staged,'platform',dir)
  mkdirp.sync(destPath)
  const items = listItems(srcPath)
  await Promise.mapSeries(items, item => {
    return buildItem(item, srcPath, destPath, babelrc)
  })
}
