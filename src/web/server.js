import './core/services/environment'
import log from './core/utils/log'
import middleware from './core/lib/express'
import express from 'express'

const processor = async () => {

  const server = express()

  await middleware(server)

  server.listen(process.env.SERVER_PORT)

  log('info', 'server', `Listening on ${process.env.SERVER_PORT}`)

}

processor()
