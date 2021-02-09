const { next } = require('./utils')
const _ = require('lodash')

const getVoice = (voice) => {
  if(_.includes(['Nicole','Russell'], voice)) return voice
  return `${voice}-Neural`
}

const say = (req, twiml, child = false) => {

  const voice = getVoice(req.step.voice)
  const loop = req.step.loop
  const text = req.step.text

  const phrases = text.split('\n')

  phrases.map((phrase,index) => {
    twiml.say({
      voice: `Polly.${voice}`,
      ...loop ? { loop } : {}
    }, phrase)
    if(index < phrases.length - 1) {
      twiml.pause({
        length: 1
      })
    }
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
