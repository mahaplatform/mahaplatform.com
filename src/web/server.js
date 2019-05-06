import './core/services/environment'
import socketio from './core/lib/socketio'
import express from './core/lib/express'
import log from './core/utils/log'
import { Server } from 'http'

const processor = async () => {

  const app = await express()

  const transport = Server(app)

  socketio(transport)

  transport.listen(process.env.SERVER_PORT)

  log('info', 'server', `Listening on ${process.env.SERVER_PORT}`)

}

processor()
