import '../web/core/services/environment'
import clientConfig from '../web/config/webpack.production.config'
import apps from '../web/core/utils/apps'
import log from '../web/core/utils/log'
import { transform } from 'babel-core'
import move from 'move-concurrently'
import webpack from 'webpack'
import rimraf from 'rimraf'
import mkdirp from 'mkdirp'
import path from 'path'
import ncp from 'ncp'
import fs from 'fs'

const babelrc = getBabelRc()

const staged = path.resolve('dist.staged')

const dist = path.resolve('dist')

const copy = Promise.promisify(ncp)

const getBabelRc = () => {
  const babelrc = path.join('.babelrc')
  const config = fs.readFileSync(babelrc, 'utf8')
  return JSON.parse(config)
}

const buildClient = async () => {
  const stats = await new Promise((resolve, reject) => {
    webpack(clientConfig).run((err, stats) => {
      if(err) reject(err)
      resolve(stats)
    })
  })
  const time = (stats.endTime - stats.startTime) / 1000
  log('info', 'dev', `Finished in ${time}`)
}

const getItemType = (item) => path.extname(item).length > 0 ? path.extname(item).substr(1) : 'dir'

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
], [])

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

const buildServer = async () => {
  const appDirs = apps.map(app => `apps/${app}`)
  const dirs = [...appDirs, 'core']
  const entries = ['cron.js','server.js','worker.js']
  await Promise.map(dirs, buildDir)
  await Promise.map(entries, buildEntry)
}

const build = async (flags, args) => {
  rimraf.sync(staged)
  mkdirp.sync(staged)
  await buildClient()
  await buildServer()
  rimraf.sync(dist)
  await move(staged, dist)
}

build().then(process.exit)
