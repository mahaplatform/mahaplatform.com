import '@core/services/environment'
import log from '@core/utils/log'
import express from 'express'
import path from 'path'
import next from 'next'
import url from 'url'

const processor = async () => {

  const app = next({
    dev: false,
    dir: path.join('src','web')
  })

  const handle = app.getRequestHandler()

  await app.prepare()

  const server = express()

  server.get('/ping', (req, res) => {
    res.send('pong')
  })

  server.get('*', (req, res) => {
    const parsed = url.parse(req.url)
    const { pathname, query } = parsed
    handle(req, res, pathname, query)
  })

  server.listen(process.env.WEB_PORT, () => {
    log('info', 'server', `Listening on ${process.env.WEB_PORT}`)
  })

}

processor()
