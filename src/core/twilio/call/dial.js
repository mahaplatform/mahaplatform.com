const number = (dial, number) => {
  dial.number({
    statusCallback: `${process.env.TWILIO_STATUS_HOST}/twilio/status`,
    statusCallbackEvent: ['initiated','ringing','answered','completed']
  }, number)
}

const client = (dial, client) => {
  dial.client({
    statusCallback: `${process.env.TWILIO_STATUS_HOST}/twilio/status`,
    statusCallbackEvent: ['initiated','ringing','answered','completed']
  }, client)
}

const queue = (dial, queue) => {
  dial.queue(queue)
}

const dial = (twiml, config) => {
  console.log(config)
  const dial = twiml.dial({
    callerId: config.from
  })
  if(config.number) number(dial, config.number)
  if(config.client) client(dial, config.client)
  if(config.queue) queue(dial, config.queue)
}

module.exports = dial
