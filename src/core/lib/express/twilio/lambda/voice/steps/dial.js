const play = require('./play')
const say = require('./say')

const dial = (req, twiml) => {

  const { body, step } = req
  const { recipients } = step

  if(step.say) say({ step: step.say }, twiml, true)
  if(step.play) play({ step: step.play }, twiml, true)

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
    recipients
  }

}

module.exports = dial
