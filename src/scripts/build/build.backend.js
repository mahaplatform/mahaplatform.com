import '@core/services/environment'
import { transform } from '@babel/core'
import babel from './babel.backend'
import apps from '@core/utils/apps'
import log from '@core/utils/log'
import mkdirp from 'mkdirp'
import path from 'path'
import _ from 'lodash'
import ncp from 'ncp'
import ejs from 'ejs'
import fs from 'fs'

let babelrc = null

const srcDir = path.resolve('src')

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

const transpileFile = (src, dest) => {
  const source = fs.readFileSync(src, 'utf8')
  const transpiled = transform(source, {
    ...babelrc,
    filename: path.basename(src)
  })
  fs.writeFileSync(dest, transpiled.code)
}

const buildItem = async (item, srcPath, destPath) => {
  const dest = item.src.replace(srcPath, destPath)
  const file = path.basename(item.src)
  if(!_.includes(jswhitelist, file) && item.type === 'js') return transpileFile(item.src, dest)
  if(item.type === 'dir') return mkdirp.sync(dest)
  return await copy(item.src, dest)
}

const buildEntry = async (entry) => {
  const srcPath = path.resolve('src',entry)
  const destPath = path.join(staged,'platform',entry)
  await transpileFile(srcPath, destPath)
}

const buildDir = async (dir) => {
  const srcPath = path.resolve('src',dir)
  const destPath = path.join(staged,'platform',dir)
  mkdirp.sync(destPath)
  const items = listItems(srcPath)
  await Promise.mapSeries(items, item => buildItem(item, srcPath, destPath))
}

const buildBackend = async (root, environment) => {
  log('info', 'server', 'Compiling...')
  babelrc = babel(root)
  const appDirs = apps.map(app => `apps/${app}`)
  const entries = fs.readdirSync(srcDir).filter(item => {
    return !fs.lstatSync(path.join(srcDir,item)).isDirectory()
  })
  await Promise.map(['core','analytics',...appDirs], buildDir)
  await Promise.map(entries, buildEntry)
  const template = fs.readFileSync(path.join(__dirname, 'ecosystem.config.js.ejs'), 'utf8')
  const data = ejs.render(template, { environment })
  fs.writeFileSync(path.join(staged,'platform','ecosystem.config.js'), data, 'utf8')
  await copy(path.join('package.json'), path.join(staged,'platform','package.json'))
  await copy(path.join('package-lock.json'), path.join(staged,'platform','package-lock.json'))
  log('info', 'server', 'Compiled successfully.')
}

export default buildBackend
