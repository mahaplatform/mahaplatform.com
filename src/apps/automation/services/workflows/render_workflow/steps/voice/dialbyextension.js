import { announce, getSegment } from '../../utils'
import User from '@apps/maha/models/user'
import _ from 'lodash'

const getUser = async (req, user_id) => {
  const user = await User.query(qb => {
    qb.where('id', user_id)
  }).fetch({
    transacting: req.trx
  })
  return [
    { client: user.get('client') },
    { number: user.get('cell_phone') }
  ]
}

const dialbyextension = async (req, { steps, step }) => {
  const { config } = step
  return {
    verb: 'dialbyextension',
    ...await announce(req, config),
    extensions: await Promise.mapSeries(config.extensions, async(extension) => ({
      extension: extension.extension,
      ...await announce(req, extension),
      recipients: await Promise.reduce(extension.recipients, async(recipients, recipient) => [
        ...recipients,
        ...recipient.strategy === 'user' ? await getUser(req, recipient.user_id) : [{ number: recipient.number }]
      ], [])
    })),
    ..._.includes(config.specials, 'hash') ? {
      hash: {
        steps: await getSegment(req, {
          steps,
          parent: step.code,
          answer: 'hash'
        })
      }
    } : {},
    ..._.includes(config.specials, 'star') ? {
      star: {
        steps: await getSegment(req, {
          steps,
          parent: step.code,
          answer: 'star'
        })
      }
    } : {},
    noanswer: {
      steps: await getSegment(req, {
        steps,
        parent: step.code,
        answer: 'noanswer'
      })
    },
    noinput: {
      steps: await getSegment(req, {
        steps,
        parent: step.code,
        answer: 'noinput'
      })
    }
  }
}

export default dialbyextension
