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

const src = (src) => src.replace('/.src','/src')

const dest = (src) => src.replace('/src','/.src')

const getHashpath = (src) => {
  const filename = src.replace(/.*src\//,'').split('/').join('.')+'.hash'
  return path.join(dest(srcDir),'hash',filename)
}

const unlink = (src) => {
  const destpath = dest(src)
  const hashpath = getHashpath(src)
  log('info', 'backend', `Unlinking ${destpath}`)
  if(fs.existsSync(destpath)) fs.unlinkSync(destpath)
  if(fs.existsSync(hashpath)) fs.unlinkSync(hashpath)
}

const write = (src, destpath, content, action) => {
  const hashpath = getHashpath(src)
  const hash = crypto.createHash('sha256').update(content, 'utf8').digest()
  if(fs.existsSync(destpath) && fs.existsSync(hashpath)) {
    const oldhash = fs.readFileSync(hashpath, 'utf8')
    if(hash.toString('utf8')  === oldhash) return
  }
  log('info', 'backend', `${action} ${src}`)
  fs.writeFileSync(destpath, content)
  fs.writeFileSync(hashpath, hash)
}

const copy = (src) => {
  const destpath = dest(src)
  if(fs.existsSync(destpath) && fs.statSync(src).mtime <= fs.statSync(destpath).mtime) return
  const content = fs.readFileSync(src)
  write(src, destpath, content, 'Copying')
}

const transpile = (src) => {
  const destpath = dest(src)
  if(fs.existsSync(destpath) && fs.statSync(src).mtime <= fs.statSync(destpath).mtime) return
  const source = fs.readFileSync(src, 'utf8')
  const transpiled = transform(source, {
    ...babelrc,
    filename: path.basename(src)
  })
  write(src, destpath, transpiled.code, 'Compiling')
}

const buildFile = (filepath) => {
  if(path.extname(filepath) === '.js') return transpile(filepath)
  copy(filepath)
}

const buildItem = async (root) => {
  if(root.match(/admin\/(activities|badges|components|roots|tokens|views)$/) || root.match(/db$/)) return
  mkdirp.sync(dest(root))
  await Promise.map(fs.readdirSync(root), async (file) => {
    const filepath = path.join(root, file)
    if(file.match(/_test.js$/)) return
    if(fs.lstatSync(filepath).isDirectory()) return await buildItem(filepath)
    buildFile(filepath)
  })
}

const buildRoot = async () => {
  log('info', 'backend', 'Compiling src')
  const destDir = dest(srcDir)
  mkdirp.sync(dest(srcDir))
  mkdirp.sync(path.join(destDir,'hash'))
  await Promise.map(fs.readdirSync(srcDir), async (file) => {
    const filepath = path.join(srcDir, file)
    if(_.includes(['analytics','apps','core','public'], file)) return await buildItem(filepath)
    if(path.extname(file) === '.js') buildFile(filepath)
  })
}

const cleanItem = async(root) => {
  await Promise.map(fs.readdirSync(root), async (file) => {
    const filepath = path.join(root, file)
    const srcpath = src(filepath)
    if(file === 'hash') return
    if(fs.lstatSync(filepath).isDirectory()) return await cleanItem(filepath)
    if(!fs.existsSync(srcpath)) unlink(filepath)
  })
}

const cleanDotSrc = async (root) => {
  log('info', 'backend', 'Cleaning dotsrc')
  const destDir = dest(srcDir)
  await cleanItem(destDir)
}

const watchSrc = async () => {
  log('info', 'backend', 'Watching src')
  chokidar.watch([
    path.resolve(srcDir,'*.js'),
    path.resolve(srcDir,'analytics'),
    path.resolve(srcDir,'apps'),
    path.resolve(srcDir,'core'),
    path.resolve(srcDir,'public')
  ], {
    ignoreInitial: true,
    ignored: (absolute) => {
      const pathname = absolute.replace(srcDir,'src')
      if(pathname.match(/web/)) return true
      if(pathname.match(/admin\/(activities|badges|components|roots|tokens|views)/)) return true
      if(pathname.match(/_test\.js$/)) return true
      return false
    }
  }).on('all', async (event, absolute) => {
    if(event === 'add') {
      return buildFile(absolute)
    }
    if(event === 'change') {
      return buildFile(absolute)
    }
    if(event === 'unlink') {
      return unlink(absolute)
    }
  })
}

const start = () => {
  const proc = spawn('node', ['--enable-source-maps','--inspect','.src/backend.js','--color','--quiet'], {
    stdio: ['pipe', 'pipe', 'pipe', 'ipc'],
    env: {
      ...process.env,
      NODE_ENV: 'development'
    }
  })
  proc.stdout.on('data', (data) => {
    process.stdout.write(data)
  })
  proc.stderr.on('data', (data) => {
    process.stdout.write(data)
  })
  return proc
}

const restartBackend = _.debounce(() => {
  log('info', 'backend', 'Restarting backend')
  backend.kill('sighup')
  backend = start()
}, 500)

const watchDotSrc = async () => {
  log('info', 'backend', 'Watching dotsrc')
  backend = start()
  chokidar.watch(dest(srcDir), {
    ignoreInitial: true
  }).on('all', (event, absolute) => {
    const srcpath = src(absolute)
    const srcExists = fs.existsSync(srcpath)
    if(event === 'add' && !srcExists) {
      log('error', 'backend', 'Dont touch files in .src')
      return unlink(absolute)
    }
    if(event === 'unlink' && srcExists) {
      log('error', 'backend', 'Dont touch files in .src')
      return buildFile(srcpath)
    }
    restartBackend()
  })
}

const watchBackend = async () => {
  await buildRoot()
  await cleanDotSrc()
  await watchSrc()
  await watchDotSrc()
}

export default watchBackend
