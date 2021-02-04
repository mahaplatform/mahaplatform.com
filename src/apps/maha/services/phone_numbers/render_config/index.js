import voicemail from './voicemail'
import play from './play'
import dial from './dial'
import say from './say'

const getCreator = (action) => {
  if(action === 'voicemail') return voicemail
  if(action === 'play') return play
  if(action === 'dial') return dial
  if(action === 'say') return say
}

const getStep = async (req, { step }) => {
  const creator = getCreator(step.action)
  if(!creator) return {}
  return await creator(req, {
    config: step.config
  })
}

const getSegment = async (req, { steps, parent, answer }) => {
  const filtered = steps.filter((step) => {
    return step.parent === parent && step.answer === answer
  }).sort((a, b) => {
    return a.delta < b.delta ? -1 : 1
  })
  return await Promise.mapSeries(filtered, async(step) => {
    return await getStep(req, {
      step
    })
  })
}

const renderConfig = async (req, { phone_number, config }) => {
  return {
    workflow: {
      code: 'abcdef'
    },
    steps: await getSegment(req, {
      steps: config.steps,
      parent: null,
      answer: null
    })
  }
}

export default renderConfig
