import '../../apps/maha/core/services/environment'
import clientConfig from './webpack.config'
import { transform } from 'babel-core'
import precompile from './precompile'
import move from 'move-concurrently'
import webpack from 'webpack'
import rimraf from 'rimraf'
import mkdirp from 'mkdirp'
import chalk from 'chalk'
import path from 'path'
import ejs from 'ejs'
import ncp from 'ncp'
import fs from 'fs'

const apps = process.env.APPS.split(',')

const templateRoot = path.resolve(__dirname, 'templates')

const buildTemplates = (root, templates, variables) => templates.map(entity => {

  const templatePath = path.join(templateRoot, `${entity}.ejs`)

  const template = fs.readFileSync(templatePath, 'utf8')

  const filepath = path.join(root, entity)

  fs.writeFileSync(filepath, ejs.render(template, variables))

})

const compileClient = async ({ src, dest, variables }) => {

  mkdirp.sync(path.join(dest, 'js'))

  const stats = await new Promise((resolve, reject) => {

    webpack(clientConfig(apps, src, dest)).run((err, stats) => {

      if(err) reject(err)

      resolve(stats)

    })

  })

  const time = (stats.endTime - stats.startTime) / 1000

  process.stdout.write(chalk.grey(`Finished in ${time}`))

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
          [app]: path.resolve('dist','apps',app,'server.js')
        }), {})
      }]
    ],
    sourceMaps: 'inline'
  })

  fs.writeFileSync(dest, transpiled.code)

}

const mkdir = (src, dest) => {

  mkdirp.sync(dest)

}

const copy = (src, dest) => {

  return Promise.promisify(ncp)(src, dest)

}

const buildItem = async (item, srcPath, destPath) => {

  const dest = item.src.replace(srcPath, destPath)

  if(item.type === 'js') return transpileFile(item.src, dest)

  if(item.type === 'dir') return mkdir(item.src, dest)

  return await copy(item.src, dest)

}

const buildItems = async (srcPath, destPath) => {

  const items = listItems(srcPath)

  await Promise.mapSeries(items, item => buildItem(item, srcPath, destPath))

}

export const buildApp = async (app) => {

  await buildItems(path.resolve('src','apps', app), path.join('dist.staged', 'apps', app))

}

export const buildServer = async () => {

  await Promise.mapSeries(process.env.APPS.split(','), buildApp)

  const templates = ['cron.js','server.js','socket.js','worker.js']

  buildTemplates(path.resolve('dist.staged'), templates, {})

}

const build = async (flags, args) => {

  rimraf.sync(path.resolve('dist.staged'))

  await compileClient({
    src: path.resolve('src', 'apps', 'maha', 'admin'),
    dest: path.resolve('dist.staged','public', 'admin'),
    variables: precompile()
  })

  await buildServer()

  rimraf.sync(path.resolve('dist'))

  await move(path.resolve('dist.staged'), path.resolve('dist'))

  await copy(path.resolve('.env'), path.resolve('dist','.env'))

  await copy(path.resolve('package.json'), path.resolve('dist','package.json'))

  await copy(path.resolve('package-lock.json'), path.resolve('dist','package-lock.json'))
}

build().then(process.exit)
