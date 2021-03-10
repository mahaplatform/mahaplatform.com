import '@core/services/environment'
import log from '@core/utils/log'
import express from 'express'
import path from 'path'
import next from 'next'

const watchWeb = async () => {

  const app = next({
    dev: process.env.NODE_ENV !== 'production',
    dir: path.join('src','web')
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
