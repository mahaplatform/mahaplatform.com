import formatObjectForTransport from '../../utils/format_object_for_transport'
import { authenticate } from './utils'
import _ from 'lodash'

const server = async (io, socket) => {

  let authorized = []

  const authorize = (channel) => _.includes(authorized, channel)

  socket.on('join', async (token, channels) => {

    const authenticated = token ? await authenticate(token) : true

    if(!authenticated) return

    const result = await Promise.map(channels, async channel => {

      if(!authorize(channel)) {

        socket.join(channel)

        authorized.push(channel)

      }

      return channel

    })

    socket.emit('join', result)

  })

  socket.on('leave', async (token, channels) => {

    const result = await Promise.map(channels, async channel => {

      if(authorize(channel)) {

        socket.leave(channel)

        authorized = authorized.filter(ch => ch !== channel)

      }

      return channel

    })

    socket.emit('leave', result)

  })

  socket.on('message', (token, channel, data) => {

    const authorized = authorize(channel)

    if(authorized) io.in(channel).send(formatObjectForTransport(data))

  })

}

export default server
