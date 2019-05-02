import { getPresence, setPresence, removePresence } from '../../services/presence'
import { authenticate } from './utils'
import moment from 'moment'

const presence = async (io, socket) => {

  let auth = null

  const presence = await getPresence()

  socket.emit('presence', presence)

  socket.on('signin', async (token, channel, data) => {

    const authentication = await authenticate(token)

    auth = authentication

    if(!auth.user) return

    const users = await getPresence()

    const deviceValue = (property, type) => {
      const record = auth.session.related('device').related(property)
      return record.get(type)
    }

    const presence = await setPresence([
      ...users.filter(item => item.session_id !== auth.session.get('id')),
      {
        user_id: auth.user.get('id'),
        session_id: auth.session.get('id'),
        device_id: auth.session.get('device_id'),
        device: {
          platform_type: deviceValue('platform_type', 'text'),
          device_type: deviceValue('device_type', 'text'),
          device_name: deviceValue('device_type', 'display'),
          os_name: deviceValue('os_name', 'display'),
          browser_name: deviceValue('browser_name', 'display')
        },
        status: data.status,
        last_active_at: null
      }
    ])

    io.emit('presence', presence)

  })

  socket.on('signout', async (token, channel, data) => {

    if(!auth) return

    const users = await getPresence()

    const presence = await setPresence(users.filter(item => {

      return item.session_id !== auth.session.get('id')

    }))

    io.emit('presence', presence)

  })

  socket.on('status', async (token, channel, data) => {

    const authentication = await authenticate(token)

    auth = authentication

    if(!auth.user) return

    const users = await getPresence()

    const presence = await setPresence(users.map(item => {
      if(item.session_id !== auth.session.get('id')) return item
      return {
        ...item,
        status: data.status,
        last_active_at: data.status === 'absent' ? moment() : null
      }
    }))

    io.emit('presence', presence)

  })

  socket.on('disconnect', async () => {

    if(!auth) return

    const presence = await removePresence(auth.session.get('id'))

    auth = null

    io.emit('presence', presence)

  })

}

export default presence
