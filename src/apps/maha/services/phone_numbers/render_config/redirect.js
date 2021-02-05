const redirect = async (req, { steps, step }) => {
  const { destination } = step.config
  return { verb: 'say', text: destination }
}

export default redirect
