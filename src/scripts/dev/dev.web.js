import '@core/services/environment'
import log from '@core/utils/log'
import babelrc from './babel.web'
import express from 'express'
import path from 'path'
import next from 'next'

const watchWeb = async () => {

  const app = next({
    dev: process.env.NODE_ENV !== 'production',
    dir: path.join('src','web'),
    conf: {
      webpack: (config, {dev, isServer}) => {
        config.module.rules.push({
          test: /\.js$/,
          exclude: /(node_modules)/,
          loader: 'babel-loader',
          options: {
            cacheDirectory: true,
            ...babelrc
          }
        })
        return config
      }
    }
  })

  const handle = app.getRequestHandler()

  await app.prepare()

  const server = express()

  server.get('*', handle)

  server.listen(3000, (err) => {
    if (err) throw err
    log('error', 'web', 'Listening on 3000')
  })

}

export default watchWeb
