import formatObjectForTransport from '../../utils/format_object_for_transport'
import socket from '../emitter'
import knex from '../knex'
import _ from 'lodash'

export const refresh = async (req, messages) => {
  await knex.transaction(async trx => {
    await Promise.map(_.castArray(messages), async message => {
      try {
        const channel = _getChannel(req, message)
        const targets = _getTarget(req, message)
        await Promise.map(_.castArray(targets), async target => {
          await socket.in(channel).emit('message', {
            target,
            action: 'refresh',
            data: null
          })
        })

      } catch(e) {
        process.stdout.write(e)
      }
    })
  })
}

export const message = async (req, messages) => {
  await knex.transaction(async trx => {
    await Promise.map(_.castArray(messages), async message => {
      try {
        const channel = _getChannel(req, message)
        const targets = _getTarget(req, message)
        await Promise.map(_.castArray(targets), async target => {
          await socket.in(channel).emit('message', {
            target,
            action: message.action,
            data: message.data ? formatObjectForTransport(message.data) : null
          })
        })
      } catch(e) {
        process.stdout.write(e)
      }
    })
  })
}

const _getChannel = (req, message) => {
  if(_.isString(message)) return message
  if(message.channel === 'team') return `/admin/teams/${req.team.get('id')}`
  if(message.channel === 'user') return `/admin/users/${req.user.get('id')}`
  if(message.channel) return message.channel
  return null
}

const _getTarget = (req, message) => {
  if(message.target) return message.target
  return _getChannel(req, message)
}

export default {
  message,
  refresh
}
