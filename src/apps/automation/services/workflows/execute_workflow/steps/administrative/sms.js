import { sendSMS } from '../../../../../../maha/services/smses'
import User from '../../../../../../maha/models/user'
import { getEnrollmentData } from '../utils'

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

const smsStep = async (req, { config, enrollment, tokens }) => {

  const to = await getToNumber(req, {
    config
  })

  const data = await getEnrollmentData(req, {
    enrollment
  })

  const sms = await sendSMS(req, {
    from: process.env.TWILIO_NUMBER,
    to,
    body: config.message.replace(/<%- ([\w]*)\.([\w]*) %>/g, '<%- $1[\'$2\'] %>'),
    asset_ids: config.asset_ids,
    data: {
      ...tokens,
      response: enrollment.get('response_id') ? data : null,
      registration: enrollment.get('registration_id') ? data : null
    }
  })

  return {
    action: {
      sms_id: sms.get('id')
    }
  }

}

export default smsStep
