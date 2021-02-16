import { sendSMS } from '@apps/maha/services/smses'
import User from '@apps/maha/models/user'
import { getNext } from '../utils'

const getToNumber = async (req, { number, user_id }) => {
  if(number) return number
  return await User.query(qb => {
    qb.where('id', user_id)
  }).fetch({
    transacting: req.trx
  }).then(user => {
    return user.get('cell_phone')
  })
}

const smsStep = async (req, { config, contact, state, step, tokens }) => {

  const sms = await sendSMS(req, {
    from: process.env.TWILIO_NUMBER,
    to: await getToNumber(req, step.config),
    body: step.config.message,
    asset_ids: step.config.asset_ids,
    data: tokens,
    queue: false
  })

  return {
    action: {
      sms_id: sms.get('id')
    },
    next: getNext(req, { config, state })
  }

}

export default smsStep
