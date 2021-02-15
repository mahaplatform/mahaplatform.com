import { getNext } from '../utils'
import _ from 'lodash'

const getVoice = (voice) => {
  if(_.includes(['Nicole','Russell'], voice)) return voice
  return `${voice}-Neural`
}

const sayStep = (req, { config, state, step, twiml }, child = false) => {

  const { text } = step.config.say

  const voice = getVoice(step.config.say.voice)

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

  return {
    action: {
      voice,
      text
    },
    next: !child ? getNext(req, { config, state }) : null,
    twiml
  }

}

export default sayStep
