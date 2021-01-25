const hangup  = require('./hangup')
const gather = require('./gather')
const record = require('./record')
const Twilio = require('twilio')
const dial = require('./dial')
const play = require('./play')
const say = require('./say')

const getExecutor = (verb) => {
  if(verb === 'dial') return dial
  if(verb === 'play') return play
  if(verb === 'gather') return gather
  if(verb === 'record') return record
  if(verb === 'say') return say
  return hangup
}

const execute = (req) => {
  const twiml = new Twilio.twiml.VoiceResponse()
  const executor = getExecutor(req.step.verb)
  const result = executor(req, twiml)
  return { result, twiml }
}

const terminate = (req) => {
  const twiml = new Twilio.twiml.VoiceResponse()
  hangup(req, twiml)
  return twiml
}

exports.execute = execute
exports.terminate = terminate
