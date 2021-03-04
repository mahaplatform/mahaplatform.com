import '@core/services/environment'
import { transform } from '@babel/core'
import log from '../../core/utils/log'
import { spawn } from 'child_process'
import babelrc from './dev.babel'
import chokidar from 'chokidar'
import mkdirp from 'mkdirp'
import path from 'path'
import _ from 'lodash'
import ncp from 'ncp'
import fs from 'fs'

const srcDir = path.resolve('src')

let backend = null

const dest = (src) => src.replace('/src','/.src')

const unlink = (src) => {
  const destpath = dest(src)
  fs.unlinkSync(destpath)
}

const copy = (src) => {
  const destpath = dest(src)
  if(fs.existsSync(destpath) && fs.statSync(src).mtime <= fs.statSync(destpath).mtime) return
  Promise.promisify(ncp)(src, destpath)
}

const transpile = (src) => {
  const destpath = dest(src)
  if(fs.existsSync(destpath) && fs.statSync(src).mtime <= fs.statSync(destpath).mtime) return
  const source = fs.readFileSync(src, 'utf8')
  const transpiled = transform(source, babelrc)
  fs.writeFileSync(destpath, transpiled.code)
}

const buildItem = async (root) => {
  if(root.match(/admin\/(activities|badges|components|roots|tokens|views)$/) || root.match(/db$/)) return
  mkdirp.sync(dest(root))
  await Promise.map(fs.readdirSync(root), async (file) => {
    const filepath = path.join(root, file)
    if(file.match(/_test.js$/)) return
    if(fs.lstatSync(filepath).isDirectory()) return await buildItem(filepath)
    if(path.extname(file) === '.js') return transpile(filepath)
    await copy(filepath)
  })
}

const buildRoot = async (root) => {
  log('info', 'backend', 'Compiling src')
  mkdirp.sync(dest(root))
  await Promise.map(fs.readdirSync(root), async (file) => {
    const filepath = path.join(root, file)
    if(_.includes(['analytics','apps','core'], file)) return await buildItem(filepath)
    if(path.extname(file) === '.js') return transpile(filepath)
  })
}

const watchSrc = async () => {
  log('info', 'backend', 'Watching src')
  chokidar.watch([
    path.resolve(srcDir,'*.js'),
    path.resolve(srcDir,'analytics'),
    path.resolve(srcDir,'apps'),
    path.resolve(srcDir,'core')
  ], {
    ignoreInitial: true
  }).on('all', (event, absolute) => {
    const pathname = absolute.replace(srcDir,'src')
    if(pathname.match(/admin\/(activities|badges|components|roots|tokens|views)/)) return
    if(pathname.match(/_test.js$/)) return
    if(event === 'add') {
      log('info', 'backend', `Adding ${pathname}`)
      return transpile(absolute)
    }
    if(event === 'change') {
      log('info', 'backend', `Recompiling ${pathname}`)
      return transpile(absolute)
    }
    if(event === 'unlink') {
      log('info', 'backend', `Removing ${pathname}`)
      return unlink(absolute)
    }
  })
}

const start = () => {
  const proc = spawn('node', ['.src/backend.js','--inspect','--color','--quiet'], {
    stdio: ['pipe', 'pipe', 'pipe', 'ipc'],
    env: {
      ...process.env,
      NODE_ENV: 'development'
    }
  })
  proc.stdout.on('data', function (data) {
    process.stdout.write(data)
  })
  proc.stderr.on('data', function (data) {
    process.stdout.write(data)
  })
  return proc
}

const restartBackend = _.debounce(() => {
  log('info', 'backend', 'Restarting dotsrc')
  backend.kill('sighup')
  backend = start()
}, 500)

const watchDotSrc = async () => {
  log('info', 'backend', 'Watching dotsrc')
  backend = start()
  chokidar.watch(dest(srcDir), {
    ignoreInitial: true
  }).on('all', (event, absolute) => {
    const pathname = absolute.replace(dest(srcDir),'.src')
    if(pathname.match(/core\/admin\/(app.js|index.less)$/)) return
    log('info', 'backend', `${event} ${absolute}`)
    restartBackend()
  })
}

const watchBackend = async () => {
  await buildRoot(srcDir)
  await watchSrc()
  await watchDotSrc()
}

export default watchBackend
