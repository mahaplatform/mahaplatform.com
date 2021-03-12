import '@core/services/environment'
import web from '@web/lib/express'
import log from '@core/utils/log'
import express from 'express'
import path from 'path'
import next from 'next'
import url from 'url'

const root = path.resolve(__dirname)

const processor = async () => {

  const app = next({
    dev: false,
    dir: path.join(root,'web')
  })

  const handle = app.getRequestHandler()

  await app.prepare()

  const server = express()

  server.use(web)

  server.get('*', (req, res) => {
    const { pathname, query } = url.parse(req.url)
    handle(req, res, pathname, query)
  })

  server.listen(process.env.WEB_PORT, () => {
    log('info', 'server', `Listening on ${process.env.WEB_PORT}`)
  })

}

processor()
