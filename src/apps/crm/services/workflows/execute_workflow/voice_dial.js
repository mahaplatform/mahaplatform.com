import User from '../../../../maha/models/user'
import { twiml } from 'twilio'

const dial = async (req, { call, config, enrollment, execute, step }) => {

  if(execute === false) {
    return {
      ...call.status === 'failed' ? {
        unenroll: true
      } : {},
      action: {
        ...config.user_id ? {
          user_id: config.user_id
        } : {},
        data: {
          ...config.number ? {
            number: config.number
          } : {},
          duration: call.duration,
          status: call.status
        }
      }
    }
  }

  const user = config.user_id ? await User.query(qb => {
    qb.where('id', config.user_id)
  }).fetch({
    transacting: req.trx
  }) : null

  const response = new twiml.VoiceResponse()

  const dial = response.dial({
    action: `${process.env.TWIML_HOST}/voice/crm/enrollments/${enrollment.get('code')}/${step.get('code')}/dial`,
    callerId: enrollment.related('voice_campaign').related('phone_number').get('number')
  })

  if(user) dial.client(`user-${user.get('id')}`)

  if(user.get('cell_phone')) dial.number(user.get('cell_phone'))

  if(config.number) dial.number(config.number)

  return {
    twiml: response.toString()
  }

}

export default dial
