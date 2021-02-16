import { getNext } from '../utils'
import _ from 'lodash'

const getVoice = (voice) => {
  if(_.includes(['Nicole','Russell'], voice)) return `Polly.${voice}`
  return `Polly.${voice}-Neural`
}

const sayStep = (req, { config, state, step, twiml }, child = false) => {

  const { text } = step.say

  const voice = getVoice(step.say.voice)

  const phrases = text.split('\n')

  phrases.map((phrase,index) => {

    twiml.say({
      voice
    }, phrase)

    if(index < phrases.length - 1) {
      twiml.pause({
        length: 1
      })
    }

  })

  return {
    action: {
      data: {
        voice: step.say.voice,
        text
      }
    },
    next: !child ? getNext(req, { config, state }) : null,
    twiml
  }

}

export default sayStep
