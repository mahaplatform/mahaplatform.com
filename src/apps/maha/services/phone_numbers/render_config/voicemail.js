import { announce } from './utils'

const voicemail = async (req, { steps, step }) => {
  const { config } = step
  return {
    verb: 'voicemail',
    ...await announce(req, {
      strategy: config.strategy,
      voice: config.voice,
      text: config.text,
      recording_id: config.recording_id
    })
  }
}

export default voicemail
