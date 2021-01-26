const dial = (req, twiml) => {

  const { recipients } = req.step

  const dial = twiml.dial()

  recipients.map(recipient => {
    const { client, number } = recipient
    if(number) {
      dial.number({
        statusCallback: 'https://twiml.mahaplatform.com/status',
        statusCallbackEvent: ['initiated','ringing','answered','completed']
      }, number)
    }
    if(client) {
      dial.client({
        statusCallback: 'https://twiml.mahaplatform.com/status',
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
