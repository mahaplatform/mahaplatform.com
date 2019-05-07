import '../../web/core/services/environment'
import clientConfig from '../../web/config/webpack.production.config'
import apps from '../../web/core/utils/apps'
import log from '../../web/core/utils/log'
import { transform } from 'babel-core'
import precompile from './precompile'
import move from 'move-concurrently'
import webpack from 'webpack'
import rimraf from 'rimraf'
import mkdirp from 'mkdirp'
import path from 'path'
import ncp from 'ncp'
import fs from 'fs'

const copy = Promise.promisify(ncp)

const compileClient = async (variables) => {
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

  const transpiled = transform(source, {
    presets: [
      'babel-preset-es2015',
      'babel-preset-react',
      'babel-preset-stage-0'
    ],
    plugins: [
      'transform-promise-to-bluebird',
      ['transform-runtime', { polyfill: false }],
      ['module-resolver', {
        alias: apps.reduce((aliases, app) => ({
          ...aliases,
          [app]: path.resolve('dist','web',app,'server.js')
        }), {})
      }]
    ],
    sourceMaps: 'inline'
  })

  fs.writeFileSync(dest, transpiled.code)

}

const buildItem = async (item, srcPath, destPath) => {

  const dest = item.src.replace(srcPath, destPath)

  if(item.type === 'js') return transpileFile(item.src, dest)

  if(item.type === 'dir') return mkdirp.sync(dest)

  return await copy(item.src, dest)

}

const buildItems = async (srcPath, destPath) => {

  const items = listItems(srcPath)

  await Promise.mapSeries(items, item => buildItem(item, srcPath, destPath))

}

export const buildServer = async () => {

  await buildItems(path.resolve('src','web'), path.join('dist.staged'))

}

const build = async (flags, args) => {

  rimraf.sync(path.resolve('dist.staged'))

  mkdirp.sync(path.resolve('dist.staged'))

  await compileClient(precompile())

  await buildServer()

  rimraf.sync(path.resolve('dist'))

  await move(path.resolve('dist.staged'), path.resolve('dist'))

}

build().then(process.exit)
