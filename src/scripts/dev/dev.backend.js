import '@core/services/environment'
import { transform } from '@babel/core'
import log from '../../core/utils/log'
import { spawn } from 'child_process'
import babelrc from './dev.babel'
import chokidar from 'chokidar'
import mkdirp from 'mkdirp'
import crypto from 'crypto'
import path from 'path'
import _ from 'lodash'
import fs from 'fs'

const srcDir = path.resolve('src')

let backend = null

const dest = (src) => src.replace('/src','/.src')

const getHashpath = (destpath) => {
  const filename = destpath.replace(`${srcDir}/`, '').replace(`${srcDir}/`, '').split('/').join('.')+'.hash'
  return path.join(dest(srcDir),'hash',filename)
}

const unlink = (src) => {
  const destpath = dest(src)
  fs.unlinkSync(destpath)
}

const write = (src, destpath, content) => {
  const hashpath = getHashpath(src)
  const hash = crypto.createHash('sha256').update(content, 'utf8').digest()
  if(fs.existsSync(hashpath)) {
    const oldhash = fs.readFileSync(hashpath, 'utf8')
    if(hash.toString('utf8')  === oldhash) return
  }
  fs.writeFileSync(destpath, content)
  fs.writeFileSync(hashpath, hash)
}

const copy = (src) => {
  const destpath = dest(src)
  if(fs.existsSync(destpath) && fs.statSync(src).mtime <= fs.statSync(destpath).mtime) return
  const content = fs.readFileSync(src)
  write(src, destpath, content)
}

const transpile = (src) => {
  const destpath = dest(src)
  if(fs.existsSync(destpath) && fs.statSync(src).mtime <= fs.statSync(destpath).mtime) return
  const source = fs.readFileSync(src, 'utf8')
  const transpiled = transform(source, babelrc)
  write(src, destpath, transpiled.code)
}

const buildFile = async (filepath) => {
  if(path.extname(filepath) === '.js') return transpile(filepath)
  await copy(filepath)
}

const buildItem = async (root) => {
  if(root.match(/admin\/(activities|badges|components|roots|tokens|views)$/) || root.match(/db$/)) return
  mkdirp.sync(dest(root))
  await Promise.map(fs.readdirSync(root), async (file) => {
    const filepath = path.join(root, file)
    if(file.match(/_test.js$/)) return
    if(fs.lstatSync(filepath).isDirectory()) return await buildItem(filepath)
    await buildFile(filepath)
  })
}

const buildRoot = async () => {
  log('info', 'backend', 'Compiling src')
  const destDir = dest(srcDir)
  mkdirp.sync(dest(srcDir))
  mkdirp.sync(path.join(destDir,'hash'))
  await Promise.map(fs.readdirSync(srcDir), async (file) => {
    const filepath = path.join(srcDir, file)
    if(_.includes(['analytics','apps','core'], file)) return await buildItem(filepath)
    if(path.extname(file) === '.js') await buildFile(filepath)
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
    ignoreInitial: true,
    ignored: (absolute) => {
      const pathname = absolute.replace(srcDir,'src')
      if(pathname.match(/web/)) return true
      if(pathname.match(/admin\/(activities|badges|components|roots|tokens|views)/)) return true
      if(pathname.match(/_test.js$/)) return true
      return false
    }
  }).on('all', async (event, absolute) => {
    const pathname = absolute.replace(srcDir,'src')
    if(event === 'add') {
      log('info', 'backend', `Adding ${pathname}`)
      return await buildFile(absolute)
    }
    if(event === 'change') {
      log('info', 'backend', `Recompiling ${pathname}`)
      return await buildFile(absolute)
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
    log('info', 'backend', `${event} ${absolute}`)
    restartBackend()
  })
}

const watchBackend = async () => {
  await buildRoot()
  await watchSrc()
  await watchDotSrc()
}

export default watchBackend
