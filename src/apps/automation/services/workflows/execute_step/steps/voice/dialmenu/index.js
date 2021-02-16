import answer from './answer'
import ask from './ask'

const dialmenuStep = (req, { config, enrollment, state, step, twiml }) => {
  const verb = req.query.action === 'answer' ? answer : ask
  return verb(req, { config, enrollment, state, step, twiml })
}

export default dialmenuStep
