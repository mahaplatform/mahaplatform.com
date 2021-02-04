const say = async (req, { config }) => {
  const { text, voice } = config
  return { verb: 'say', voice, text }
}

export default say
