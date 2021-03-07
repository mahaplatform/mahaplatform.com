import { getPresence, setPresence, removePresence } from '@core/services/presence'
import { authenticate } from './utils'
import moment from 'moment'

const presence = async (io, socket) => {

  let auth = null

  const presence = await getPresence()

  socket.emit('presence', presence)

  socket.on('signin', async (token, channel, data) => {

    const authenticated = token ? await authenticate(token) : true

    if(!authenticated) return

    auth = authenticated

    if(!auth.account) return

    const accounts = await getPresence()

    const deviceValue = (property, type) => {
      const record = auth.signin.related('device').related(property)
      return record.get(type)
    }

    const presence = await setPresence([
      ...accounts.filter(item => item.signin_id !== auth.signin.get('id')),
      {
        account_id: auth.account.get('id'),
        signin_id: auth.signin.get('id'),
        device: {
          id: auth.signin.get('device_id'),
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

    const accounts = await getPresence()

    const presence = await setPresence(accounts.filter(item => {
      return item.signin_id !== auth.signin.get('id')
    }))

    io.emit('presence', presence)

  })

  socket.on('status', async (token, channel, data) => {

    const authentication = await authenticate(token)

    auth = authentication

    if(!auth.account) return

    const accounts = await getPresence()

    const presence = await setPresence(accounts.map(item => {
      if(!auth.signin || item.signin_id !== auth.signin.get('id')) return item
      return {
        ...item,
        status: data.status,
        last_active_at: data.status === 'absent' ? moment() : null
      }
    }))

    io.emit('presence', presence)

  })

  socket.on('disconnect', async () => {

    if(!auth || !auth.signin) return

    const presence = await removePresence(auth.signin.get('id'))

    auth = null

    io.emit('presence', presence)

  })

}

export default presence
