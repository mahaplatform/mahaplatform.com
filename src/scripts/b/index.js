import '@core/services/environment'
import babelrc from '@core/utils/babel.config'
import { transform } from '@babel/core'
import log from '../../core/utils/log'
import rimraf from 'rimraf'
import mkdirp from 'mkdirp'
import path from 'path'
import _ from 'lodash'
import fs from 'fs'

const srcDir = path.resolve('src')

const dest = (src) => src.replace('/src/','/.src/')

const getDuration = (start) => {
  const diff = process.hrtime(start)
  const ms = diff[0] * 1e3 + diff[1] * 1e-6
  const duration =  (ms / 1000).toFixed(3)
  return `${duration}s`
}

const transpile = (src) => {
  const destpath = dest(src)
  if(fs.existsSync(destpath) && fs.statSync(src).mtime <= fs.statSync(destpath).mtime) return
  const source = fs.readFileSync(src, 'utf8')
  const transpiled = transform(source, {
    ...babelrc,
    sourceMaps: 'inline'
  })
  fs.writeFileSync(destpath, transpiled.code)
}

const buildItem = async (root) => {
  if(root.match(/(activities|db|badges|components|roots|routes|tokens|views)$/)) return
  mkdirp.sync(dest(root))
  await Promise.map(fs.readdirSync(root), async (file) => {
    const filepath = path.join(root, file)
    if(file.match(/test.js$/)) return
    if(fs.lstatSync(filepath).isDirectory()) return await buildItem(filepath)
    if(path.extname(file) === '.js') return transpile(filepath)
  })
}

const buildRoot = async (root) => {
  mkdirp.sync(dest(root))
  await Promise.map(fs.readdirSync(root), async (file) => {
    const filepath = path.join(root, file)
    if(_.includes(['analytics','apps','core'], file)) return await buildItem(filepath)
    if(path.extname(file) === '.js') return transpile(filepath)
  })
}

const buildFresh = async() => {
  rimraf.sync(dest(srcDir))
  await buildRoot(srcDir)
}

const processor = async () => {
  log('info', 'build', 'Compiling...')
  const start = process.hrtime()
  await buildRoot(srcDir)
  log('info', 'build', `Finished in ${getDuration(start)}`)
}

processor().then(process.exit)
