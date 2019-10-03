import '../web/core/services/environment'
import * as template from '../web/core/templates/config/webpack.development.config'
import webConfig from '../web/core/admin/config/webpack.development.config'
import * as form from '../web/core/forms/config/webpack.development.config'
import desktopConfig from '../desktop/config/webpack.config'
import mobileConfig from '../mobile/config/webpack.config'
import devServer from 'webpack-dev-server'
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
  nodemon.push('--watch')
  nodemon.push(path.resolve('src','web'))

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
  const watchDir = path.resolve('src','desktop','app')
  await watch('desktop', watchDir, desktopConfig)
}

const mobileWatch = async () => {
  const watchDir = path.resolve('src','mobile','app')
  await watch('mobile', watchDir, mobileConfig)
}

const templateWatch = async () => {
  const { emailConfig, webConfig } = template
  const watchDir = path.resolve('src','web','core','templates')
  await watch('template:email', path.join(watchDir,'email'), emailConfig)
  await watch('template:web', path.join(watchDir,'web'), webConfig)
}

const formWatch = async () => {
  const { designerConfig, embedConfig, formConfig } = form
  const watchDir = path.resolve('src','web','core','forms')
  await watch('form:designer', path.join(watchDir,'designer'), designerConfig)
  await watch('form:embed', path.join(watchDir,'embed'), embedConfig)
  await watch('form:form', path.join(watchDir,'form'), formConfig)
}

const watch = async (module, watchDir, config) => {
  let compiling = false
  chokidar.watch(watchDir).on('all', (event, path) => {
    if(compiling) return
    if(!_.includes(['add','change'], event)) return
    compiling = true
    log('info', module, 'Compiling...')
    webpack(config).run((err, stats) => {
      compiling = false
      if(err) return log('error', module, err)
      const info = stats.toJson()
      if(stats.hasErrors()) return log('error', module, info.errors)
      log('info', module, 'Compiled successfully.')
    })
  })
}

const adminWatch = async () => {

  const devserver = new devServer(webpack(webConfig), {
    contentBase: path.resolve('src','web','public'),
    hot: true,
    publicPath: '/admin',
    proxy: [
      ...'api/,jobs/,caman/,imagecache/,.well-known/,mailbox_mime/,v,c,ns,so'.split(',').reduce((proxies, path) => [
        ...proxies,
        `/${path}*`
      ], []),
      ...'html,json'.split(',').reduce((proxies, ext) => [
        ...proxies,
        `/admin/*.${ext}`
      ], []),
      ...'authorize,token,preview'.split(',').reduce((proxies, path) => [
        ...proxies,
        `/admin/*/${path}`
      ], []),
      ...'auth,audio,css,fonts,images,js'.split(',').reduce((proxies, path) => [
        ...proxies,
        `/admin/${path}/*`
      ], []),
      ...'crm,drive'.split(',').reduce((apps, path) => [
        ...apps,
        `/${path}/**`
      ], [])
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

export const dev = async () => {
  const argv = process.argv.slice(2)
  const services = argv.length > 0 ? argv : ['server','template','form','desktop','mobile','admin']
  if(_.includes(services, 'server')) await serverWatch()
  // if(_.includes(services, 'template')) await templateWatch()
  // if(_.includes(services, 'form')) await formWatch()
  // if(_.includes(services, 'desktop')) await desktopWatch()
  // if(_.includes(services, 'mobile')) await mobileWatch()
  if(_.includes(services, 'admin')) await adminWatch()
}

dev()
