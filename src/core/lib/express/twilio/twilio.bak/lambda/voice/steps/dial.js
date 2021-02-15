const { voiceurl } = require('./utils')
const play = require('./play')
const say = require('./say')

const performAnnounce = (req, gather) => {
  const { step } = req
  if(step.say) return say({ step: step.say }, gather, true)
  if(step.play) return play({ step: step.play }, gather, true)
  return null
}

const announce = (req, twiml) => {
  const { state } = req.query
  const announce = performAnnounce(req, twiml)
  if(!announce) return forward(req, twiml)
  twiml.redirect(voiceurl(req, '/voice', { state, action: 'forward' }))
  return {
    verb: 'dial',
    action: 'announce',
    announce
  }
}

const forward = (req, twiml) => {

  const { body, step } = req
  const { recipients } = step

  const dial = twiml.dial({
    callerId: body.To
  })

  recipients.map(recipient => {
    if(recipient.number) {
      dial.number({
        statusCallback: `${process.env.TWILIO_HOST_STATUS}/voice-status`,
        statusCallbackEvent: ['initiated','ringing','answered','completed']
      }, recipient.number)
    }
    if(recipient.client) {
      const client = dial.client({
        statusCallback: `${process.env.TWILIO_HOST_STATUS}/voice-status`,
        statusCallbackEvent: ['initiated','ringing','answered','completed']
      }, recipient.client)
      client.parameter({
        name: 'action',
        value: 'new'
      })
    }
  })

  return {
    verb: 'dial',
    action: 'forward',
    recipients
  }

}

const dial = (req, twiml) => {
  const verb = req.query.action === 'forward' ? forward : announce
  return verb(req, twiml)
}

module.exports = dial
