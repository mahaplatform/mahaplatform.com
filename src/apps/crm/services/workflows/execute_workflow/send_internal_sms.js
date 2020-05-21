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

  console.log('tokens', tokens)

  const to = await getToNumber(req, {
    config
  })

  await sendSMS(req, {
    from: process.env.TWILIO_NUMBER,
    to,
    body: config.message,
    asset_ids: config.asset_ids,
    data: tokens
  })

  return {}

}

export default sendInternalSms
