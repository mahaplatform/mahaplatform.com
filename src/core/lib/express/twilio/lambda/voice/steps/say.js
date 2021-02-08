const { next } = require('./utils')
const _ = require('lodash')

const getVoice = (voice) => {
  if(_.includes(['Nicole','Russell'], voice)) return voice
  return `${voice}-Neural`
}

const say = (req, twiml, child = false) => {

  const voice = getVoice(req.step.voice)
  const loop = req.step.loop || 1
  const text = req.step.text

  text.split('\n').map(segment => {
    twiml.say({
      voice: `Polly.${voice}`,
      loop
    }, segment)
    twiml.pause(1)
  })

  if(!child) next(req, twiml)

  return {
    verb: 'say',
    voice,
    loop,
    text
  }

}

module.exports = say
