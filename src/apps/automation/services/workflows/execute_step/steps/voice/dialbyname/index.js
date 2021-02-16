import announce from './announce'
import forward from './forward'
import choose from './choose'
import answer from './answer'
import ask from './ask'

const getAction = (action) => {
  if(action === 'announce') return announce
  if(action === 'forward') return forward
  if(action === 'choose') return choose
  if(action === 'answer') return answer
  return ask
}

const dialByNameStep = async (req, { config, enrollment, state, step, twiml })  => {
  const action = getAction(req.query.action)
  return await action(req, { config, enrollment, state, step, twiml })
}

export default dialByNameStep
