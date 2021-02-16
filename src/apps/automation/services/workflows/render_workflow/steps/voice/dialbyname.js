import { announce, getSegment } from '../../utils'
import User from '@apps/maha/models/user'
import _ from 'lodash'

const getUser = async (req, user_id) => {
  const user = await User.query(qb => {
    qb.where('id', user_id)
  }).fetch({
    transacting: req.trx
  })
  return {
    first_name: user.get('first_name'),
    last_name: user.get('last_name'),
    client: user.get('client'),
    number: user.get('cell_phone')
  }
}

const dialbyname = async (req, { steps, step }) => {
  const { config } = step
  return {
    verb: 'dialbyname',
    ...await announce(req, config),
    recipients: await Promise.mapSeries(config.recipients, async(recipient) => ({
      ...await announce(req, recipient),
      ...await getUser(req, recipient.user_id)
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

export default dialbyname
