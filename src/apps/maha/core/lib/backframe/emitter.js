import formatObjectForTransport from '../../utils/format_object_for_transport'
import socket from '../../services/emitter'
import { Plugin } from 'backframe'
import _ from 'lodash'

const afterCommit = async (req, trx, result, options) => {

  if(options.refresh) await handleRefresh(req, trx, result, options)

  if(options.messages) await handleMessages(req, trx, result, options)

}

const handleRefresh = async (req, trx, result, options) => {

  await options.knex.transaction(async trx => {

    const messages = await options.refresh(req, trx, result, options)

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

const handleMessages = async (req, trx, result, options) => {

  await options.knex.transaction(async trx => {

    const messages = await options.messages(req, trx, result, options)

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

const refresherPlugin = new Plugin({
  name: 'refresher',
  afterCommit
})

export default refresherPlugin
