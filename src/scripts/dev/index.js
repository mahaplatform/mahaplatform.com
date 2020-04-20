import '../../core/services/environment'
import desktopConfig from '../../desktop/config/webpack.config'
import mobileConfig from '../../mobile/config/webpack.config'
import adminConfig from './webpack.admin.config'
import webpackConfig from './webpack.config'
import devServer from 'webpack-dev-server'
import log from '../../core/utils/log'
import { spawn } from 'child_process'
import chokidar from 'chokidar'
import webpack from 'webpack'
import ngrok from 'ngrok'
import path from 'path'
import _ from 'lodash'
import fs from 'fs'

const protocol = /https/.test(process.env.WEB_HOST) ? 'https' : 'http'

const appsDir = path.resolve('src','apps')

const subapps = fs.readdirSync(appsDir).reduce((apps, app) => {
  const appDir = path.join(appsDir, app, 'web')
  return [
    ...apps,
    ...fs.existsSync(appDir) ? fs.readdirSync(appDir).reduce((apps, subapp, index) => {
      const dir = path.join(appsDir, app, 'web',subapp)
      return [
        ...apps,
        { app, subapp, dir }
      ]
    }, []) : []
  ]
}, []).map((subapp, index) => ({
  ...subapp,
  port: parseInt(process.env.DEVSERVER_PORT) + index + 2
}))

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
  nodemon.push(path.resolve('src','apps'))
  nodemon.push('--watch')
  nodemon.push(path.resolve('src','core'))
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

const webWatch = async () => {
  subapps.map((item, index) => {
    const { app, subapp, dir, port } = item
    const publicPath = `/apps/${app}/${subapp}`
    const config = webpack(webpackConfig(app, subapp, dir, port))
    const devserver = new devServer(config, {
      disableHostCheck: true,
      hot: true,
      publicPath,
      quiet: true,
      historyApiFallback: {
        disableDotRule: true,
        rewrites: [
          { from: /.*/, to: publicPath }
        ]
      }
    })
    devserver.listen(port, null, () => {
      log('info', `${app}:${subapp}`, `Listening on port ${port}`)
    })
  })
}

const adminWatch = async () => {
  const wildcard = {
    target: `http://${process.env.DOMAIN}:${process.env.SERVER_PORT}`,
    bypass: (req, res, proxyOptions) => {
      const root = path.join('src','core','admin','public')
      const parts = req.url.split('?').shift().split('/').slice(2)
      if(fs.existsSync(path.join(root,...parts))) return null
      if(/^\/admin\/(oauth|auth)/.test(req.url)) return null
      if(/^\/admin/.test(req.url)) return req.url
    }
  }
  const devserver = new devServer(webpack(adminConfig), {
    https: protocol === 'https' ? {
      key: fs.readFileSync(path.join('keys','dev.mahaplatform.com.key')),
      cert: fs.readFileSync(path.join('keys','dev.mahaplatform.com.crt'))
    } : false,
    disableHostCheck: true,
    contentBase: path.resolve('src','core','admin','public'),
    hot: true,
    publicPath: '/admin',
    proxy: {
      '/socket': {
        target: `http://${process.env.DOMAIN}:${process.env.SERVER_PORT}`,
        ws: true
      },
      ...subapps.reduce((proxies, proxy) => ({
        ...proxies,
        [`/apps/${proxy.app}/${proxy.subapp}/**`]: {
          target: `http://${process.env.DOMAIN}:${proxy.port}`,
          secure: false
        }
      }), {}),
      '**': wildcard,
      '/.*': wildcard,
      '/.**/*': wildcard
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

export const dev = async () => {
  const argv = process.argv.slice(2)
  const services = argv.length > 0 ? argv : ['server','web','admin']
  await ngrok.connect({
    authtoken: process.env.NGROK_AUTHTOKEN,
    addr: process.env.SERVER_PORT,
    subdomain: process.env.NGROK_SUBDOMAIN
  })
  if(_.includes(services, 'server')) await serverWatch()
  if(_.includes(services, 'desktop')) await desktopWatch()
  if(_.includes(services, 'mobile')) await mobileWatch()
  if(_.includes(services, 'web')) await webWatch()
  if(_.includes(services, 'admin')) await adminWatch()
}

dev()
