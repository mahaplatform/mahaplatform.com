import './core/services/environment'
import ping from './core/lib/express/ping'
import middleware from './core/lib/socketio'
import log from './core/utils/log'
import Redis from 'socket.io-redis'
import socketio from 'socket.io'
import express from 'express'
import http from 'http'

const processor = async () => {

  const server = express()

  server.use(ping)

  const transport = http.createServer(server)

  const redis = Redis(process.env.REDIS_URL)

  const io = socketio(transport)

  io.adapter(redis)

  io.on('connection', (sock) => middleware(io, sock))

  log('info', 'socket', `Listening on ${process.env.SOCKET_PORT}`)

  transport.listen(process.env.SOCKET_PORT)

}

processor()
