import '@core/services/environment'
import { createProxyMiddleware } from 'http-proxy-middleware'
import { normalizeUrl } from '@web/utils/urls'
import web from '@web/lib/express'
import log from '@core/utils/log'
import express from 'express'
import https from 'https'
import path from 'path'
import next from 'next'
import url from 'url'
import fs from 'fs'

const nextPort = parseInt(process.env.WEB_PORT) + 1

const watchNext = async () => {

  const app = next({
    dev: process.env.NODE_ENV !== 'production',
    dir: path.join('src','web')
  })

  const handle = app.getRequestHandler()

  await app.prepare()

  const server = express()

  server.use(web)

  server.get('*', (req, res) => {
    req.url = normalizeUrl(req.url)
    const { pathname, query } = url.parse(req.url)
    handle(req, res, pathname, query)
  })

  const httpsServer = https.createServer({
    key: fs.readFileSync(path.join('keys','dev.mahaplatform.com.key')),
    cert: fs.readFileSync(path.join('keys','dev.mahaplatform.com.crt')),
    ca: fs.readFileSync(path.join('keys','digicert.pem'))
  }, server)

  httpsServer.listen(nextPort, () => {
    log('error', 'web', `Listening on ${nextPort}`)
  })

}

const watchCloudFront = async () => {

  const server = express()

  server.use('/api', createProxyMiddleware({
    secure: false,
    target: process.env.ADMIN_HOST,
    changeOrigin: true
  }))

  server.use('/imagecache', createProxyMiddleware({
    secure: false,
    target: process.env.ADMIN_HOST,
    changeOrigin: true
  }))

  server.use('/_next*', createProxyMiddleware({
    secure: false,
    target: process.env.ADMIN_HOST.replace(8080,nextPort),
    changeOrigin: true
  }))

  server.use('*', createProxyMiddleware({
    secure: false,
    target: process.env.ADMIN_HOST.replace(8080,nextPort),
    pathRewrite: (pathname, req) => {
      return `/websites/ocyg5ng5dz${pathname}`
    },
    changeOrigin: true
  }))

  const httpsServer = https.createServer({
    key: fs.readFileSync(path.join('keys','dev.mahaplatform.com.key')),
    cert: fs.readFileSync(path.join('keys','dev.mahaplatform.com.crt')),
    ca: fs.readFileSync(path.join('keys','digicert.pem'))
  }, server)

  httpsServer.listen(process.env.WEB_PORT, () => {
    log('error', 'web', `Listening on ${process.env.WEB_PORT}`)
  })

}

const watchWeb = async () => {
  await watchNext()
  await watchCloudFront()

}

export default watchWeb
