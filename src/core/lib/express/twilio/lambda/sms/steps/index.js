const timeofday = require('./timeofday')
const question = require('./question')
const redirect = require('./redirect')
const message = require('./message')
const Twilio = require('twilio')

const getExecutor = (verb) => {
  if(verb === 'timeofday') return timeofday
  if(verb === 'question') return question
  if(verb === 'redirect') return redirect
  if(verb === 'message') return message
}

const execute = (req, res) => {
  const twiml = new Twilio.twiml.MessagingResponse()
  const executor = getExecutor(req.step.verb)
  const result = executor(req, res, twiml)
  return { result, twiml }
}

module.exports = execute
