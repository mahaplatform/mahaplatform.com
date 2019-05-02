import ping from '../../core/lib/express/ping'
import middleware from '../lib/socketio'
import { info } from '../utils/console'
import Redis from 'socket.io-redis'
import socketio from 'socket.io'
import express from 'express'
import http from 'http'

export default async () => {

  const server = express()

  server.use(ping)

  const transport = http.createServer(server)

  const redis = Redis(process.env.REDIS_URL)

  const io = socketio(transport)

  io.adapter(redis)

  io.on('connection', (sock) => middleware(io, sock))

  info('SOCKET', `Listening on ${process.env.SOCKET_PORT}`)

  transport.listen(process.env.SOCKET_PORT)

}
