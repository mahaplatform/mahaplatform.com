import './core/services/environment'
import { withLogger } from './core/utils/logger'
import log from './core/utils/log'
import middleware from './core/lib/express'
import multiparty from 'connect-multiparty'
import bodyParser from 'body-parser'
import express from 'express'
import path from 'path'
import qs from 'qs'

const processor = async () => {

  const server = express()

  const platformMiddleware = await middleware()

  server.set('query parser', str => qs.parse(str, { arrayLimit: 100, depth: 10 }))

  server.use(bodyParser.urlencoded({ extended: true, limit: '5mb' }))

  server.use(bodyParser.json({ limit: '5mb' }))

  server.use(multiparty({ uploadDir: './tmp' }))

  server.use(express.static(path.resolve(__dirname, 'public'), { redirect: false }))

  const favicon = path.resolve(__dirname, 'apps', 'maha', 'public', 'public', 'images', 'favicon.ico')

  server.get('/favicon.ico', (req, res) => res.sendFile(favicon))

  const platform = (process.env.NODE_ENV !== 'production') ? withLogger(platformMiddleware) : platformMiddleware

  server.use(platform)

  log('info', 'server', `Listening on ${process.env.SERVER_PORT}`)

  server.listen(process.env.SERVER_PORT)

}

processor()
