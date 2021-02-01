const dial = (req, twiml) => {

  const { recipients } = req.step

  const dial = twiml.dial()

  recipients.map(recipient => {
    if(recipient.number) {
      dial.number({
        statusCallback: `${process.env.TWILIO_STATUS_HOST}/twilio/status`,
        statusCallbackEvent: ['initiated','ringing','answered','completed']
      }, recipient.number)
    }
    if(recipient.client) {
      const client = dial.client({
        statusCallback: `${process.env.TWILIO_STATUS_HOST}/twilio/status`,
        statusCallbackEvent: ['initiated','ringing','answered','completed']
      }, recipient.client)
      client.parameter({
        name: 'action',
        value: 'new'
      })
    }
  })

  return {
    verb: 'dial',
    recipients
  }

}

module.exports = dial
