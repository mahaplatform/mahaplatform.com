const { hangup } = require('./hangup')
const { gather } = require('./gather')
const { record } = require('./record')
const { dial } = require('./dial')
const { play } = require('./play')
const Twilio = require('twilio')
const { say } = require('./say')

const getExecutor = (verb) => {
  if(verb === 'dial') return dial
  if(verb === 'play') return play
  if(verb === 'gather') return gather
  if(verb === 'record') return record
  if(verb === 'say') return say
  return hangup
}

const execute = (call, step) => {
  const twiml = new Twilio.twiml.VoiceResponse()
  const executor = getExecutor(step.verb)
  const result = executor(twiml, call, step)
  return { result, twiml }
}

const terminate = () => {
  const twiml = new Twilio.twiml.VoiceResponse()
  hangup({ twiml })
  return { twiml }
}

exports.execute = execute
exports.terminate = terminate
