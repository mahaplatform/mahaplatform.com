import '@core/services/environment'
import manifest from '@web/lib/manifest'
import log from '@core/utils/log'
import express from 'express'
import path from 'path'
import next from 'next'
import https from 'https'
import fs from 'fs'

const watchWeb = async () => {

  const app = next({
    dev: process.env.NODE_ENV !== 'production',
    dir: path.join('src','web')
  })

  const handle = app.getRequestHandler()

  await app.prepare()

  const server = express()

  server.get('/sites/:code/manifest.json', manifest)

  server.get('*', handle)

  const httpsServer = https.createServer({
    key: fs.readFileSync(path.join('keys','dev.mahaplatform.com.key')),
    cert: fs.readFileSync(path.join('keys','dev.mahaplatform.com.crt')),
    ca: fs.readFileSync(path.join('keys','digicert.pem'))
  }, server)

  httpsServer.listen(process.env.WEB_PORT, () => {
    log('error', 'web', `Listening on ${process.env.WEB_PORT}`)
  })

}

export default watchWeb
