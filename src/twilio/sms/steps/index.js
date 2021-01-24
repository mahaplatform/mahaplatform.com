const { message } = require('./message')
const Twilio = require('twilio')

const getExecutor = (verb) => {
  if(verb === 'message') return message
}

const execute = (thread, step) => {
  const twiml = new Twilio.twiml.MessagingResponse()
  const executor = getExecutor(step.verb)
  const result = executor(twiml, thread, step)
  return { result, twiml }
}

exports.execute = execute
