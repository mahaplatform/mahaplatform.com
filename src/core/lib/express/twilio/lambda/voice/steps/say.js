const { next } = require('./utils')
const _ = require('lodash')

const getVoice = (voice) => {
  if(_.includes(['Nicole','Russell'], voice)) return voice
  return `${voice}-Neural`
}

const say = (req, twiml, child = false) => {

  const voice = getVoice(req.step.voice)
  const text = req.step.text

  const phrases = text.split('\n')

  phrases.map((phrase,index) => {
    twiml.say({
      voice: `Polly.${voice}`
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
    voice: req.step.voice,
    text
  }

}

module.exports = say
