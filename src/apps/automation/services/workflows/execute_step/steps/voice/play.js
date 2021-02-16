import { getNext } from '../utils'

const playStep = (req, { config, state, step, twiml }, child = false) => {

  const { recording_id } = step

  twiml.play(`${process.env.TWILIO_HOST_TWIML}/voice/campaigns/recordings/${recording_id}`)

  return {
    action: {
      recording_id
    },
    next: !child ? getNext(req, { config, state }) : null,
    twiml
  }

}

export default playStep
