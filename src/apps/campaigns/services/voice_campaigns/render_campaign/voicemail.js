import { announce } from './utils'

const voicemail = async (req, { steps, step }) => {
  const { config } = step
  return await announce(req, config)
}

export default voicemail
