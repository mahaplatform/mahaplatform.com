import { announce } from './utils'
import User from '@apps/maha/models/user'

const getUser = async(req, { user_id }) => {
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

const dial = async (req, { steps, step }) => {
  const { config } = step
  return {
    verb: 'dial',
    ...await announce(req, config),
    recipients: await Promise.reduce(config.recipients, async(recipients, recipient) => [
      ...recipients,
      ...recipient.strategy === 'user' ? await getUser(req, { user_id: recipient.user_id }) : [],
      ...recipient.strategy === 'number' ? [{ number: recipient.number }] : []
    ], [])
  }
}

export default dial
