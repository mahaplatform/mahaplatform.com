const getStatus = (req) => {
  return {
    statusCallback: `${process.env.TWILIO_STATUS_HOST}/status`,
    statusCallbackEvent: ['initiated','ringing','answered','completed']
  }
}

const dial = (req, twiml, config) => {
  const dial = twiml.dial({
    callerId: config.from
  })
  if(config.number) dial.number(getStatus(req), config.number)
  if(config.client) dial.client(getStatus(req), config.client)
}

module.exports = dial
