const say = async (req, { steps, step }) => {
  const { text, voice } = step.config.say
  return { verb: 'say', voice, text }
}

export default say
