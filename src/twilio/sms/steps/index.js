const message = require('./message')
const Twilio = require('twilio')

const getExecutor = (verb) => {
  if(verb === 'message') return message
}

const execute = (req, res) => {
  const twiml = new Twilio.twiml.MessagingResponse()
  const executor = getExecutor(req.step.verb)
  const result = executor(req, res, twiml)
  return { result, twiml }
}

module.exports = execute
