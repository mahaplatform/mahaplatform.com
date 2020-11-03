import User from '../../../../../../maha/models/user'
import { twiml } from 'twilio'

const getUser = async (req, user_id) => {
  return await User.query(qb => {
    qb.where('id', user_id)
  }).fetch({
    transacting: req.trx
  })
}

const getRecipient = async (req, { recipients, dial }) => {
  if(dial.status !== 'completed') return {}
  return await Promise.reduce(recipients, async (found, recipient) => {
    if(found) return found
    const { number, strategy, user_id } = recipient
    if(strategy === 'number' && number === dial.number) return recipient
    if(strategy === 'software' && user_id === dial.user_id) return recipient
    const user = await getUser(req, user_id)
    if(strategy === 'cell' && user.get('cell_phone') === dial.number) return recipient
    return null
  }, null)
}

const dialStep = async (req, { dial, config, enrollment, execute, step }) => {

  if(execute === false) {

    const recipient = await getRecipient(req, {
      dial,
      recipients: config.recipients
    })

    return {
      ...dial.status === 'failed' ? {
        unenroll: true
      } : {},
      call_status: dial.call_status,
      action: {
        ...recipient.user_id ? {
          user_id: recipient.user_id
        } : {},
        data: {
          [`${config.code}_recipient`]: recipient.code || null,
          [`${config.code}_status`]: dial.status,
          [`${config.code}_duration`]: dial.duration,
          [`${config.code}_hangup`]: dial.hangup
        }
      }
    }
  }

  const response = new twiml.VoiceResponse()

  const dialverb = response.dial({
    action: `${process.env.TWIML_HOST}/voice/crm/enrollments/${enrollment.get('code')}/${step.get('code')}/dial`,
    callerId: enrollment.related('voice_campaign').related('phone_number').get('number'),
    timeout: 15
  })

  await Promise.mapSeries(config.recipients, async (recipient) => {

    if(recipient.strategy === 'number') {

      dialverb.number(config.number)

    } else if(recipient.strategy === 'software') {

      const client = dialverb.client({
        statusCallback: `${process.env.TWIML_HOST}/voice/status`,
        statusCallbackEvent: ['ringing','answered','completed']
      }, `user-${recipient.user_id}`)

      const params = {
        id: enrollment.get('call_id'),
        enrollment_code: enrollment.get('code'),
        step_code: step.get('code'),
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

      dialverb.number({
        statusCallback: `${process.env.TWIML_HOST}/voice/status`,
        statusCallbackEvent: ['ringing','answered','completed']
      }, user.get('cell_phone'))

    }

  })

  return {
    twiml: response.toString()
  }

}

export default dialStep
