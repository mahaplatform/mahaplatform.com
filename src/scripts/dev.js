import '../web/maha/core/services/environment'
import desktopConfig from '../desktop/config/webpack.config'
import mobileConfig from '../mobile/config/webpack.config'
import webConfig from '../web/config/webpack.development.config'
import devServer from 'webpack-dev-server'
import { spawn } from 'child_process'
import chokidar from 'chokidar'
import webpack from 'webpack'
import chalk from 'chalk'
import path from 'path'
import _ from 'lodash'
import fs from 'fs'

const log = (...options) => {
  const style = options[0] === 'error' ? chalk.red('e') : chalk.blue('i')
  const service = chalk.grey(`[${options[1]}]`)
  const message = chalk.white(`: ${options[2]}`)
  process.stdout.write(`${style} ${service} ${message}\n`)
}

const apps = process.env.APPS.split(',')

const serverWatch = async () => {

  const nodemon = [
    path.resolve('src','scripts','entities.js'),
    '--inspect',
    '--color',
    '--quiet',
    '--exec',
    'babel-node'
  ]
  fs.readdirSync(path.resolve('src','web')).filter(app => {
    return app.match(/^\./) === null
  }).map(app => {
    nodemon.push('--watch')
    nodemon.push(path.resolve('src','web',app))
    nodemon.push('--ignore')
    nodemon.push(path.resolve('src','web',app,'admin','components'))
    nodemon.push('--ignore')
    nodemon.push(path.resolve('src','web',app,'admin','views'))
  })
  nodemon.push('--watch')
  nodemon.push(path.resolve('src','packages','backframe'))

  const proc = spawn('nodemon', nodemon, {
    stdio: ['pipe', 'pipe', 'pipe', 'ipc']
  })

  proc.on('message', function (event) {
    if(event.type === 'start') {
      log('info', 'DEV', 'Compiling servers')
    } else if (event.type === 'restart') {
      log('info', 'DEV', `Detected change in ${event.data[0]}`)
    }
  })

  proc.stdout.on('data', function (data) {
    process.stdout.write(data)
  })

  proc.stderr.on('data', function (err) {
    log('error', 'DEV', err.toString())
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

  const contentBase = path.resolve('src','web','maha','admin','public')

  const server = `http://localhost:${process.env.SERVER_PORT}`

  const devserver = new devServer(webpack(webConfig(apps)), {
    contentBase,
    hot: true,
    publicPath: '/admin',
    proxy: {
      ...'api/,jobs/,imagecache/,.well-known/,mailbox_mime/,v,c,ns,so'.split(',').reduce((proxies, path) => ({
        ...proxies,
        [`/${path}*`]: server
      }), {}),
      ...'html,json'.split(',').reduce((proxies, ext) => ({
        ...proxies,
        [`/admin/*.${ext}`]: server
      }), {}),
      ...'audio,css,fonts,images,js'.split(',').reduce((proxies, path) => ({
        ...proxies,
        [`/admin/${path}/*`]: server
      }), {})
    },
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
