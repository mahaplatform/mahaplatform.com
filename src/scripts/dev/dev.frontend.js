import '@core/services/environment'
import subappConfig from './webpack.subapp.config'
import adminConfig from './webpack.admin.config'
import sdkConfig from './webpack.sdk.config'
import devServer from 'webpack-dev-server'
import watchManifest from './dev.manifest'
import log from '@core/utils/log'
import webpack from 'webpack'
import glob from 'glob'
import path from 'path'
import fs from 'fs'

const srcDir = path.resolve('src')

const appsDir = path.resolve(srcDir,'apps')

const apps = fs.readdirSync(appsDir)

const subapps = glob.sync(path.join(srcDir,'apps','*','web','*')).map((dir, index) => {
  const matches = dir.match(/apps\/(.*)\/web\/(.*)/)
  return {
    app: matches[1],
    subapp: matches[2],
    dir,
    publicPath: `/apps/${matches[1]}/${matches[2]}`,
    port: parseInt(process.env.DEVSERVER_PORT) + index + 2
  }
})

const sdkport = parseInt(process.env.DEVSERVER_PORT) + subapps.length + 2

const devserver = ({ name, config, port, options }) => {

  const server = new devServer(webpack(config), {
    disableHostCheck: true,
    clientLogLevel: 'info',
    sockHost: process.env.DOMAIN,
    transportMode: 'ws',
    quiet: true,
    hot: true,
    ...options || {}
  })

  server.listen(port, null, () => {
    log('info', 'frontend', `${name} listening on port ${port}`)
  })

}

const watchAdmin = async () => {

  const proxyError = (err) => {}

  const appregex = new RegExp(`^/(${apps.map(app => app).join('|')})`)

  const wildcard = {
    target: `http://${process.env.DOMAIN}:${process.env.SERVER_PORT}`,
    headers: {
      'x-forwarded-proto': 'https'
    },
    bypass: (req, res, proxyOptions) => {
      if(/^\/cce/.test(req.url)) return req.url
      if(/^\/(fo|op|li|wv|vw|so|ns|nv|si)\//.test(req.url)) return null
      if(/^\/(admin|adobesign|api|aws|imagecache|jobs|qr|sms|shortlinks|twilio|voice|mt|collect)/.test(req.url)) return null
      if(/^\/notifications.js/.test(req.url)) return null
      if(appregex.test(req.url)) return null
      return req.url
    },
    onError: proxyError
  }

  devserver({
    name: 'admin',
    config: adminConfig,
    port: process.env.DEVSERVER_PORT,
    options: {
      https: {
        key: fs.readFileSync(path.join('keys','dev.mahaplatform.com.key')),
        cert: fs.readFileSync(path.join('keys','dev.mahaplatform.com.crt'))
      },
      contentBase: path.resolve('src','core','admin','public'),
      proxy: {
        '/socket': {
          target: `http://${process.env.DOMAIN}:${process.env.SERVER_PORT}`,
          ws: true,
          onError: proxyError
        },
        '/mt': {
          target: `http://${process.env.DOMAIN}:${process.env.ANALYTICS_PORT}`,
          secure: false
        },
        ...subapps.reduce((proxies, proxy) => ({
          ...proxies,
          [`/apps/${proxy.app}/${proxy.subapp}/**`]: {
            target: `http://${process.env.DOMAIN}:${proxy.port}`,
            secure: false,
            onError: proxyError
          }
        }), {}),
        ...['css','js'].reduce((proxies, ext) => ({
          ...proxies,
          [`/maha.${ext}`]: {
            target: `http://${process.env.DOMAIN}:${sdkport}`,
            secure: false,
            onError: proxyError
          }
        }), {}),
        '**': wildcard,
        '/.*': wildcard,
        '/.**/*': wildcard
      },
      historyApiFallback: {
        disableDotRule: true
      }
    }
  })
}

const watchSdk = async () => {
  devserver({
    name: 'sdk',
    config: sdkConfig,
    port: sdkport
  })
}

const watchSubapps = async () => {
  subapps.map(( { app, subapp, dir, port, publicPath }, index) => {
    devserver({
      name: `${app}:${subapp}`,
      config: subappConfig(app, subapp, dir, port),
      port,
      options: {
        publicPath,
        historyApiFallback: {
          disableDotRule: true,
          rewrites: [
            { from: /.*/, to: publicPath }
          ]
        },
        watchOptions: {
          ignored: [
            path.resolve('node_modules')
          ]
        }
      }
    })
  })
}

const watchFrontend = async () => {
  await watchManifest()
  await watchAdmin()
  await watchSdk()
  // await watchSubapps()
}

export default watchFrontend
