const say = async (req, { steps, step }) => {
  const { text, voice } = step.config
  return { verb: 'say', voice, text }
}

export default say
