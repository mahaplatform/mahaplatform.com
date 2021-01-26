const dial = (twiml, config) => {
  const dial = twiml.dial({
    callerId: config.from
  })
  if(config.number) number(dial, config.number)
  if(config.client) client(dial, config.client)
}

const number = (dial, number) => {
  dial.number({
    statusCallback: 'https://twiml.mahaplatform.com/status',
    statusCallbackEvent: ['initiated','ringing','answered','completed']
  }, number)
}

const client = (dial, client) => {
  dial.client({
    statusCallback: 'https://twiml.mahaplatform.com/status',
    statusCallbackEvent: ['initiated','ringing','answered','completed']
  }, client)
}

module.exports = dial
