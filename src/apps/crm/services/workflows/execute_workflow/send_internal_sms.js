import { sendSMS } from '../../../../maha/services/smses'
import User from '../../../../maha/models/user'

const getToNumber = async (req, { config }) => {

  if(config.number) return config.number

  return await User.query(qb => {
    qb.where('id', config.user_id)
  }).fetch({
    transacting: req.trx
  }).then(user => {
    return user.get('cell_phone')
  })

}

const sendInternalSms = async (req, { config, enrollment, tokens }) => {

  const to = await getToNumber(req, {
    config
  })

  const sms = await sendSMS(req, {
    from: process.env.TWILIO_NUMBER,
    to,
    body: config.message,
    asset_ids: config.asset_ids,
    data: tokens
  })

  return {
    action: {
      sms_id: sms.get('id')
    }
  }

}

export default sendInternalSms
