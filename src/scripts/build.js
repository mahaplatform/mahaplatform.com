import '../web/core/services/environment'
import clientConfig from '../web/config/webpack.production.config'
import apps from '../web/core/utils/apps'
import log from '../web/core/utils/log'
import { transform } from 'babel-core'
import move from 'move-concurrently'
import help from './help/help'
import webpack from 'webpack'
import env from './env/env'
import rimraf from 'rimraf'
import mkdirp from 'mkdirp'
import path from 'path'
import ncp from 'ncp'
import fs from 'fs'

const getBabelRc = () => {
  const babelrc = path.join('.babelrc')
  const config = fs.readFileSync(babelrc, 'utf8')
  return JSON.parse(config)
}

const babelrc = getBabelRc()

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
  if(item.src.match(/apps\/[^/]*\/help/)) return false
  if(item.src.match(/apps\/[^/]*\/db/)) return false
  if(item.src.match(/apps\/[^/]*\/admin\/alerts/)) return false
  if(item.src.match(/apps\/[^/]*\/admin\/badges/)) return false
  if(item.src.match(/apps\/[^/]*\/admin\/components/)) return false
  if(item.src.match(/apps\/[^/]*\/admin\/navigation/)) return false
  if(item.src.match(/apps\/[^/]*\/admin\/notifications/)) return false
  if(item.src.match(/apps\/[^/]*\/admin\/rights/)) return false
  if(item.src.match(/apps\/[^/]*\/admin\/roots/)) return false
  if(item.src.match(/apps\/[^/]*\/admin\/routes/)) return false
  if(item.src.match(/apps\/[^/]*\/admin\/tokens/)) return false
  if(item.src.match(/apps\/[^/]*\/admin\/views/)) return false
  return true
})

const transpileFile = (src, dest) => {
  const source = fs.readFileSync(src, 'utf8')
  const transpiled = transform(source, babelrc)
  fs.writeFileSync(dest, transpiled.code)
}

const buildItem = async (item, srcPath, destPath) => {
  const dest = item.src.replace(srcPath, destPath)
  if(item.type === 'js') return transpileFile(item.src, dest)
  if(item.type === 'dir') return mkdirp.sync(dest)
  return await copy(item.src, dest)
}

const buildEntry = async (entry) => {
  const srcPath = path.resolve('src','web',entry)
  const destPath = path.join(staged,entry)
  await transpileFile(srcPath, destPath)
}

const buildDir = async (dir) => {
  const srcPath = path.resolve('src','web',dir)
  const destPath = path.join(staged,dir)
  mkdirp.sync(destPath)
  const items = listItems(srcPath)
  await Promise.mapSeries(items, item => buildItem(item, srcPath, destPath))
}

const buildClient = async () => {
  log('info', 'client', 'Compiling...')
  await new Promise((resolve, reject) => webpack(clientConfig).run((err, stats) => {
    if(err) reject(err)
    resolve(stats)
  }))
  log('info', 'client', 'Compiled successfully.')
}

const buildServer = async () => {
  log('info', 'server', 'Compiling...')
  const appDirs = apps.map(app => `apps/${app}`)
  await Promise.map([...appDirs, 'core'], buildDir)
  await Promise.map(['cron.js','server.js','worker.js'], buildEntry)
  await copy(path.join('src','web','config','ecosystem.config.js'), path.join(staged,'ecosystem.config.js'))
  await copy(path.join('package.json'), path.join(staged,'package.json'))
  await copy(path.join('package-lock.json'), path.join(staged,'package-lock.json'))
  log('info', 'server', 'Compiled successfully.')
}

const buildHelp = async() => {
  log('info', 'help', 'Compiling...')
  await help(staged)
  log('info', 'help', 'Compiled successfully.')
}

const buildEnv = async() => {
  log('info', 'environment', 'Compiling...')
  await env(staged)
  log('info', 'environment', 'Compiled successfully.')
}

const getDuration = (start) => {
  const diff = process.hrtime(start)
  const ms = diff[0] * 1e3 + diff[1] * 1e-6
  const duration =  (ms / 1000).toFixed(3)
  return `${duration}s`
}

const build = async (flags, args) => {
  const start = process.hrtime()
  rimraf.sync(staged)
  mkdirp.sync(staged)
  await Promise.all([
    buildServer(),
    buildClient(),
    buildHelp(),
    buildEnv()
  ])
  rimraf.sync(dist)
  await move(staged, dist)
  log('info', 'build', `Finished in ${getDuration(start)}`)
}

build().then(process.exit)
