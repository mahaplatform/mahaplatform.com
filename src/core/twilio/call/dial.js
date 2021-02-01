const number = (dial, config) => {
  dial.number({
    statusCallback: `${process.env.TWILIO_STATUS_HOST}/twilio/status`,
    statusCallbackEvent: ['initiated','ringing','answered','completed']
  }, config.number)
}

const client = (dial, config) => {
  const client = dial.client({
    statusCallback: `${process.env.TWILIO_STATUS_HOST}/twilio/status`,
    statusCallbackEvent: ['initiated','ringing','answered','completed']
  }, config.client)
  client.parameter({
    name: 'action',
    value: 'new'
  })
}

const dial = (twiml, config) => {
  const dial = twiml.dial({
    callerId: config.from
  })
  if(config.number) number(dial, config)
  if(config.client) client(dial, config)
}

module.exports = dial
