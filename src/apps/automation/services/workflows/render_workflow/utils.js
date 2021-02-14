const getStep = async (req, { steps, step }) => {
  return {
    type: step.type,
    action: step.action,
    config: step.config
  }
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
