import { announce } from './utils'

const voicemail = async (req, { steps, step }) => {
  const { config } = step
  return {
    verb: 'voicemail',
    ...await announce(req, config)
  }
}

export default voicemail
