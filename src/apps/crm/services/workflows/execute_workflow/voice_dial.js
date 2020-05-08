import User from '../../../../maha/models/user'
import { twiml } from 'twilio'

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

const dial = async (req, { config, enrollment, step }) => {

  const user = config.user_id ? await User.query(qb => {
    qb.where('id', config.user_id)
  }).fetch({
    transacting: req.trx
  }) : null

  const to = user ? user.get('cell_phone') : config.number

  const response = new twiml.VoiceResponse()

  const dial = response.dial({
    callerId: enrollment.related('voice_campaign').related('phone_number').get('number')
  })

  dial.number(to)

  response.redirect({
    method: 'POST'
  }, `${process.env.TWIML_HOST}/voice/crm/enrollments/${enrollment.get('code')}/${step.get('code')}/next`)

  return {
    data: {
      ...user ? { user_id: user.get('id') } : {},
      ...config.number ? { data: { number: config.number } } : {}
    },
    twiml: response.toString()
  }

}

export default dial
