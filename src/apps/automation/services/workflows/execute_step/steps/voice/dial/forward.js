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

const forward = async (req, { step, twiml }) => {

  const dial = twiml.dial({
    callerId: req.body.To,
    timeout: 15
  })

  const recipients = await Promise.reduce(step.recipients, async(recipients, recipient) => [
    ...recipients,
    ...recipient.strategy === 'user' ? await getUser(req, { user_id: recipient.user_id }) : [],
    ...recipient.strategy === 'number' ? [{ number: recipient.number }] : []
  ], [])

  recipients.map(recipient => {

    if(recipient.number) {

      dial.number({
        statusCallback: `${process.env.TWILIO_HOST_STATUS}/voice/status`,
        statusCallbackEvent: ['initiated','ringing','answered','completed']
      }, recipient.number)

    }

    if(recipient.user) {

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
