import topic from './topic'
import list from './list'

const getCreator = (action) => {
  if(action === 'topic') return topic
  if(action === 'list') return list
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
