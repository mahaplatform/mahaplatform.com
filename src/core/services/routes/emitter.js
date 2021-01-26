import formatObjectForTransport from '../../utils/format_object_for_transport'
import socket from '../../vendor/emitter'
import _ from 'lodash'

export const refresh = async (req, messages) => {
  await Promise.map(_.castArray(messages), async message => {
    const channels = _getChannels(req, message)
    const targets = _getTargets(req, message)
    await Promise.map(_.castArray(channels), async channel => {
      await Promise.map(_.castArray(targets), async target => {
        await socket.in(channel).emit('message', {
          target,
          action: 'refresh',
          data: null
        })
      })
    })
  })
}

export const message = async (req, messages) => {
  await Promise.map(_.castArray(messages), async message => {
    const channels = _getChannels(req, message)
    const targets = _getTargets(req, message)
    await Promise.map(_.castArray(channels), async channel => {
      await Promise.map(_.castArray(targets), async target => {
        await socket.in(channel).emit('message', {
          target,
          action: message.action,
          data: message.data ? formatObjectForTransport(message.data) : null
        })
      })
    })
  })
}

const _getChannels = (req, message) => {
  if(_.isString(message)) return message
  if(message.channel === 'account') return `/admin/accounts/${req.account.get('id')}`
  if(message.channel === 'team') return `/admin/teams/${req.team.get('id')}`
  if(message.channel === 'user') return `/admin/users/${req.user.get('id')}`
  if(message.channel) return message.channel
  return null
}

const _getTargets = (req, message) => {
  return message.target || _getChannels(req, message)
}

export default {
  message,
  refresh
}
