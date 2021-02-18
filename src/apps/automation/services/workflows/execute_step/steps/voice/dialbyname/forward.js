import User from '@apps/maha/models/user'
import { getUrl } from '../../utils'

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

const forward = async (req, { config, state, step, twiml }) => {

  const recipient = step.recipients[req.query.index]

  const dial = twiml.dial({
    callerId: req.body.To,
    timeout: 15
  })

  const recipients = await getUser(req, { user_id: recipient.user_id })

  recipients.map(recipient => {

    if(recipient.number) {

      dial.number({
        statusCallback: `${process.env.TWILIO_HOST_STATUS}/voice/status`,
        statusCallbackEvent: ['initiated','ringing','answered','completed']
      }, recipient.number)

    }

    if(recipient.client) {

      const client = dial.client({
        statusCallback: `${process.env.TWILIO_HOST_STATUS}/voice/status`,
        statusCallbackEvent: ['initiated','ringing','answered','completed']
      }, recipient.client)

      client.parameter({
        name: 'action',
        value: 'new'
      })

    }

  })

  twiml.redirect(getUrl(req, { state: `${state}.noanswer.steps.0` }))

  return {
    action: {
      data: {
        action: 'forward',
        recipients
      }
    },
    twiml
  }

}

export default forward
