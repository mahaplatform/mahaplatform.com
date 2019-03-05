import '../../apps/maha/core/services/environment'
import { info, error, write } from './console'
import devServer from 'webpack-dev-server'
import { spawn } from 'child_process'
import config from './webpack.config'
import webpack from 'webpack'
import path from 'path'
import fs from 'fs'

const apps = process.env.APPS.split(',')

const serverWatch = async () => {

  const nodemon = [
    path.resolve('src','scripts','dev','entities.js'),
    '--color',
    '--quiet',
    '--exec',
    'node'
  ]
  fs.readdirSync(path.resolve('src','apps')).map(app => {
    nodemon.push('--watch')
    nodemon.push(path.resolve('src','apps',app))
    nodemon.push('--ignore')
    nodemon.push(path.resolve('src','apps',app,'admin','components'))
    nodemon.push('--ignore')
    nodemon.push(path.resolve('src','apps',app,'admin','views'))
  })
  nodemon.push(path.resolve('src','packages','backframe'))

  const proc = spawn('nodemon', nodemon, {
    stdio: ['pipe', 'pipe', 'pipe', 'ipc']
  })

  proc.on('message', function (event) {
    if(event.type === 'start') {
      info('DEV', 'Compiling servers')
    } else if (event.type === 'restart') {
      info('DEV', `Detected change in ${event.data[0]}`)
    }
  })

  proc.stdout.on('data', function (data) {
    write(data)
  })

  proc.stderr.on('data', function (err) {
    error('DEV', err.toString())
  })

}

export const dev = async (flags, args) => {

  await serverWatch()

  const contentBase = path.resolve('src','apps','maha','admin','public')

  const server = `http://localhost:${process.env.SERVER_PORT}`

  const devserver = new devServer(webpack(config(apps)), {
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

dev()
