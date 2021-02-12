const { next, voiceurl } = require('./utils')
const play = require('./play')
const say = require('./say')

const performAsk = (req, gather) => {
  const { step } = req
  if(step.say) return say({ step: step.say }, gather, true)
  if(step.play) return play({ step: step.play }, gather, true)
}

const ask = (req, twiml) => {
  const { state } = req.query
  const ask = performAsk(req, twiml)
  twiml.record({
    action: voiceurl(req, '/voice', { state, action: 'complete' }),
    trim: 'trim-silence',
    finishOnKey: '#'
  })
  return {
    verb: 'voicemail',
    action: 'ask',
    ask
  }
}

const complete = (req, twiml) => {
  const { body } = req
  const sid = body.RecordingSid
  next(req, twiml)
  return { verb: 'voicemail', action: 'complete', sid }
}

const voicemail = (req, twiml) => {
  const verb = req.query.action === 'complete' ? complete : ask
  return verb(req, twiml)
}

module.exports = voicemail
