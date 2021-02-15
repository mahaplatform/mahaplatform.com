import { getNext } from '../utils'

const playStep = (req, { config, state, step, twiml }, child = false) => {

  const { key } = step.config

  twiml.play(`${process.env.TWILIO_HOST_TWIML}/voice/recordings/${key}`)

  return {
    action: {
      key
    },
    next: !child ? getNext(req, { config, state }) : null,
    twiml
  }

}

export default playStep
