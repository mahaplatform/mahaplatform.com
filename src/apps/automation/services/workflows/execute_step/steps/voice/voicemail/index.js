import complete from './complete'
import ask from './ask'

const voicemailStep = async (req, { config, enrollment, state, step, twiml }) => {
  const verb = req.query.action === 'complete' ? complete : ask
  return await verb(req, { config, enrollment, state, step, twiml })
}

export default voicemailStep
