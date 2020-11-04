import '../../core/services/environment'
import { bootstrap } from '../../core/scripts/bootstrap/bootstrap'
import desktopConfig from '../../desktop/config/webpack.config'
import mobileConfig from '../../mobile/config/webpack.config'
import adminConfig from './webpack.admin.config'
import sdkConfig from './webpack.sdk.config'
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

const sdkport = parseInt(process.env.DEVSERVER_PORT) + subapps.length + 2

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

const sdkWatch = async () => {
  const devserver = new devServer(webpack(sdkConfig), {
    disableHostCheck: true,
    hot: true,
    quiet: true
  })
  devserver.listen(sdkport, null, () => {
    log('info', 'sdk', `Listening on port ${sdkport}`)
  })

}

const adminWatch = async () => {
  const wildcard = {
    target: `http://${process.env.DOMAIN}:${process.env.SERVER_PORT}`,
    headers: {
      'x-forwarded-proto': protocol
    },
    bypass: (req, res, proxyOptions) => {
      const adminRoot = path.join('src','core','admin','public')
      const parts = req.url.split('?').shift().split('/').slice(1)
      if(fs.existsSync(path.join(adminRoot,...parts))) return null
      if(/^\/(admin|api|aws|imagecache|fax|jobs|sms|voice)/.test(req.url)) return null
      if(/^\/(automation|crm|events|finance|forms|stores)/.test(req.url)) return null
      if(/^\/notifications.js/.test(req.url)) return null
      return req.url
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
      ...['css','js'].reduce((proxies, ext) => ({
        ...proxies,
        [`/maha.${ext}`]: {
          target: `http://${process.env.DOMAIN}:${sdkport}`,
          secure: false
        }
      }), {}),
      '**': wildcard,
      '/.*': wildcard,
      '/.**/*': wildcard
    },
    quiet: true,
    historyApiFallback: {
      disableDotRule: true
    }
  })
  devserver.listen(process.env.DEVSERVER_PORT)
}

const connectNgrok = async () => {
  await ngrok.connect({
    authtoken: process.env.NGROK_AUTHTOKEN,
    addr: process.env.SERVER_PORT,
    subdomain: process.env.NGROK_SUBDOMAIN
  })
}

export const dev = async () => {
  const argv = process.argv.slice(2)
  const services = argv.length > 0 ? argv : ['server','web','admin','sdk']
  await bootstrap()
  await connectNgrok()
  if(_.includes(services, 'server')) await serverWatch()
  if(_.includes(services, 'desktop')) await desktopWatch()
  if(_.includes(services, 'mobile')) await mobileWatch()
  if(_.includes(services, 'web')) await webWatch()
  if(_.includes(services, 'sdk')) await sdkWatch()
  if(_.includes(services, 'admin')) await adminWatch()
}

dev()
