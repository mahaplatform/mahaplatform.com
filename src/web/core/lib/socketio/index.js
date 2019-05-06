import collectObjects from '../../utils/collect_objects'
import Redis from 'socket.io-redis'
import presence from './presence'
import socketio from 'socket.io'
import server from './server'

const middleware = (http) => {

  const io = socketio(http, { path: '/socket' })

  io.adapter(Redis(process.env.REDIS_URL))

  io.on('connection', async (socket) => {

    const sockets = collectObjects('admin/socket.js')

    await server(io, socket)

    await presence(io, socket)

    await Promise.map(sockets, async socketFile => {

      await socketFile.default(io, socket)

    })

  })

}

export default middleware
