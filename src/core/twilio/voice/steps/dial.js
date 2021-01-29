const dial = (req, twiml) => {

  const { recipients } = req.step

  const dial = twiml.dial()

  recipients.map(recipient => {
    const { client, number } = recipient
    if(number) {
      dial.number({
        statusCallback: `${process.env.TWILIO_STATUS_HOST}/twilio/status`,
        statusCallbackEvent: ['initiated','ringing','answered','completed']
      }, number)
    }
    if(client) {
      dial.client({
        statusCallback: `${process.env.TWILIO_STATUS_HOST}/twilio/status`,
        statusCallbackEvent: ['initiated','ringing','answered','completed']
      }, client)
    }
  })

  return {
    verb: 'dial',
    recipients
  }

}

module.exports = dial
