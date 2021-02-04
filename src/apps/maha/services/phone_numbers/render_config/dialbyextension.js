const getExtension = async (req, { extension }) => {
  return {
    extension: extension.extension,
    recording_id: extension.recording_id,
    strategy: extension.strategy,
    voice: extension.voice,
    text: extension.text
  }
}

const getExtensions = async (req, { extensions }) => {
  return await Promise.mapSeries(extensions, async (extension) => {
    return await getExtension(req, { extension })
  })
}

const dialbyextension = async (req, { steps, step }) => {
  const { extensions, recording_id, specials, strategy, text, voice } = step.config
  return {
    verb: 'dialbyextension',
    extensions: await getExtensions(req, { extensions }),
    recording_id,
    specials,
    strategy,
    voice,
    text
  }
}

export default dialbyextension
