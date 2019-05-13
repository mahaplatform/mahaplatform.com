import '../web/core/services/environment'
import desktopConfig from '../desktop/config/webpack.config'
import mobileConfig from '../mobile/config/webpack.config'
import webConfig from '../web/config/webpack.development.config'
import devServer from 'webpack-dev-server'
import apps from '../web/core/utils/apps'
import log from '../web/core/utils/log'
import { spawn } from 'child_process'
import chokidar from 'chokidar'
import webpack from 'webpack'
import path from 'path'
import _ from 'lodash'

const serverWatch = async () => {

  const nodemon = [
    path.resolve('src','scripts','entities.js'),
    '--inspect',
    '--color',
    '--quiet',
    '--exec',
    'babel-node'
  ]
  apps.map(app => {
    nodemon.push('--watch')
    nodemon.push(path.resolve('src','web','apps',app))
    nodemon.push('--ignore')
    nodemon.push(path.resolve('src','web','apps',app,'admin','badges'))
    nodemon.push('--ignore')
    nodemon.push(path.resolve('src','web','apps',app,'admin','components'))
    nodemon.push('--ignore')
    nodemon.push(path.resolve('src','web','apps',app,'admin','roots'))
    nodemon.push('--ignore')
    nodemon.push(path.resolve('src','web','apps',app,'admin','tokens'))
    nodemon.push('--ignore')
    nodemon.push(path.resolve('src','web','apps',app,'admin','views'))
  })
  nodemon.push('--watch')
  nodemon.push(path.resolve('src','web','core'))

  const proc = spawn('nodemon', nodemon, {
    stdio: ['pipe', 'pipe', 'pipe', 'ipc']
  })

  proc.on('message', function (event) {
    if(event.type === 'start') {
      log('info', 'dev', 'Compiling servers')
    } else if (event.type === 'restart') {
      log('info', 'dev', `Detected change in ${event.data[0]}`)
    }
  })

  proc.stdout.on('data', function (data) {
    process.stdout.write(data)
  })

  proc.stderr.on('data', function (err) {
    log('error', 'dev', err.toString())
  })

}

const desktopWatch = async () => {
  let compiling = false
  chokidar.watch(path.resolve('src', 'desktop', 'app')).on('all', (event, path) => {
    if(compiling) return
    if(!_.includes(['add','change'], event)) return
    compiling = true
    log('info', 'desktop', 'Compiling...')
    webpack(desktopConfig).run((err, stats) => {
      compiling = false
      if(err) return log('error', 'mobile', err)
      log('info', 'desktop', 'Compiled successfully.')
    })
  })
}

const mobileWatch = async () => {
  let compiling = false
  chokidar.watch(path.resolve('src', 'mobile', 'app')).on('all', (event, path) => {
    if(compiling) return
    if(!_.includes(['add','change'], event)) return
    compiling = true
    log('info', 'mobile', 'Compiling...')
    webpack(mobileConfig).run((err, stats) => {
      compiling = false
      if(err) return log('error', 'mobile', err)
      log('info', 'mobile', 'Compiled successfully.')
    })
  })
}

const clientWatch = async () => {

  const devserver = new devServer(webpack(webConfig), {
    contentBase: path.resolve('src','web','public'),
    hot: true,
    publicPath: '/admin',
    proxy: [
      ...'api/,jobs/,imagecache/,.well-known/,mailbox_mime/,v,c,ns,so'.split(',').reduce((proxies, path) => [
        ...proxies,
        `/${path}*`
      ], []),
      ...'html,json'.split(',').reduce((proxies, ext) => [
        ...proxies,
        `/admin/*.${ext}`
      ], []),
      ...'token,preview'.split(',').reduce((proxies, path) => [
        ...proxies,
        `/admin/*/${path}`
      ], []),
      ...'audio,css,fonts,images,js'.split(',').reduce((proxies, path) => [
        ...proxies,
        `/admin/${path}/*`
      ], []),
      '/drive/*'
    ].reduce((proxies, proxy) => ({
      ...proxies,
      [proxy]: `http://localhost:${process.env.SERVER_PORT}`
    }), {
      '/socket': {
        target: `http://localhost:${process.env.SERVER_PORT}`,
        ws: true
      }
    }),
    quiet: true,
    historyApiFallback: {
      disableDotRule: true,
      rewrites: [
        { from: /.*/, to: '/admin' }
      ]
    }
  })

  devserver.listen(process.env.DEVSERVER_PORT)

}

export const dev = async (flags, args) => {
  await serverWatch()
  await desktopWatch()
  await mobileWatch()
  await clientWatch()
}

dev()
