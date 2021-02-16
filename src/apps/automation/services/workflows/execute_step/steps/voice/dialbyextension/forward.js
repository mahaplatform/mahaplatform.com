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

  const extension = step.extensions[req.query.index]

  const dial = twiml.dial({
    callerId: req.body.To
  })

  const recipients = await Promise.reduce(extension.recipients, async(recipients, recipient) => [
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
