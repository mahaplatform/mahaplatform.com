import User from '../../../../maha/models/user'
import { twiml } from 'twilio'

const getUser = async (req, user_id) => {
  return await User.query(qb => {
    qb.where('id', user_id)
  }).fetch({
    transacting: req.trx
  })
}

const getRecipient = async (req, { recipients, call }) => {
  if(call.status !== 'completed') return {}
  return await Promise.reduce(recipients, async (found, recipient) => {
    if(found) return found
    const { number, strategy, user_id } = recipient
    if(strategy === 'number' && number === call.number) return recipient
    if(strategy === 'software' && user_id === call.user_id) return recipient
    const user = await getUser(req, user_id)
    if(strategy === 'cell' && user.get('cell_phone') === call.number) return recipient
    return null
  }, null)
}

const dial = async (req, { call, config, enrollment, execute, step }) => {

  if(execute === false) {

    const recipient = await getRecipient(req, {
      call,
      recipients: config.recipients
    })

    return {
      ...call.status === 'failed' ? {
        unenroll: true
      } : {},
      action: {
        ...recipient.user_id ? {
          user_id: recipient.user_id
        } : {},
        data: {
          [`${config.code}_recipient`]: recipient.code || null,
          [`${config.code}_status`]: call.status,
          [`${config.code}_duration`]: call.duration
        }
      }
    }
  }

  const response = new twiml.VoiceResponse()

  const dial = response.dial({
    action: `${process.env.TWIML_HOST}/voice/crm/enrollments/${enrollment.get('code')}/${step.get('code')}/dial`,
    callerId: enrollment.related('voice_campaign').related('phone_number').get('number'),
    timeout: 15
  })

  await Promise.mapSeries(config.recipients, async (recipient) => {

    if(recipient.strategy === 'number') {

      dial.number(config.number)

    } else if(recipient.strategy === 'software') {

      const client = dial.client(`user-${recipient.user_id}`)

      const params = {
        id: enrollment.get('call_id'),
        enrollment_id: enrollment.get('id'),
        contact_id: enrollment.get('contact_id'),
        program_id: enrollment.related('voice_campaign').get('program_id'),
        from: enrollment.related('phone_number').get('number'),
        to: enrollment.related('voice_campaign').related('phone_number').get('number')
      }

      Object.keys(params).map(name => {
        client.parameter({
          name,
          value: params[name]
        })
      })

    } else if(recipient.strategy === 'cell') {

      const user = await getUser(req, recipient.user_id)

      dial.number(user.get('cell_phone'))

    }

  })

  console.log(response.toString())

  return {
    twiml: response.toString()
  }

}

export default dial
