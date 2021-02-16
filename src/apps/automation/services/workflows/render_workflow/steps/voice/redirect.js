const getStep = (steps, destination) => {
  return 'steps.0'
}

const redirect = async (req, { steps, step }) => {
  const { destination } = step.config
  return {
    verb: 'redirect',
    step: getStep(steps, destination)
  }
}

export default redirect
