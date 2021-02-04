import timeofday from './timeofday'
import voicemail from './voicemail'
import play from './play'
import dial from './dial'
import say from './say'

const getCreator = (action) => {
  if(action === 'timeofday') return timeofday
  if(action === 'voicemail') return voicemail
  if(action === 'play') return play
  if(action === 'dial') return dial
  if(action === 'say') return say
}

const getStep = async (req, { steps, step }) => {
  const creator = getCreator(step.action)
  if(!creator) return {}
  return await creator(req, {
    steps,
    step
  })
}

export const getSegment = async (req, { steps, parent, answer }) => {
  const filtered = steps.filter((step) => {
    return step.parent === parent && step.answer === answer
  }).sort((a, b) => {
    return a.delta < b.delta ? -1 : 1
  })
  return await Promise.mapSeries(filtered, async(step) => {
    return await getStep(req, {
      steps,
      step
    })
  })
}
