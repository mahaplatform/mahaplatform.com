const number = (dial, config) => {
  dial.number({
    statusCallback: `${process.env.TWILIO_STATUS_HOST}/twilio/status`,
    statusCallbackEvent: ['initiated','ringing','answered','completed']
  }, config.number)
}

const client = (dial, config) => {
  dial.client({
    statusCallback: `${process.env.TWILIO_STATUS_HOST}/twilio/status`,
    statusCallbackEvent: ['initiated','ringing','answered','completed']
  }, config.client)
}

const queue = (dial, config) => {
  dial.queue(config.queue)
}

const dial = (twiml, config) => {
  const dial = twiml.dial({
    callerId: config.from
  })
  if(config.number) number(dial, config)
  if(config.client) client(dial, config)
  if(config.queue) queue(dial, config)
}

module.exports = dial
