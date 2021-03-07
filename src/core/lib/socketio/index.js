import collectObjects from '@core/utils/collect_objects'
import Redis from 'socket.io-redis'
import revision from './revision'
import presence from './presence'
import socketio from 'socket.io'
import server from './server'

const sockets = collectObjects('admin/socket.js')

const middleware = (http) => {

  const io = socketio(http, {
    path: '/socket'
  })

  io.adapter(Redis(process.env.REDIS_URL))

  io.on('connection', async (socket) => {

    await revision(io, socket)

    await server(io, socket)

    await presence(io, socket)

    await Promise.map(sockets, async socketFile => {
      await socketFile.default(io, socket)
    })

  })

}

export default middleware
