import question from './question'
import answer from './answer'

const questionStep = async (req, { config, enrollment, program, state, step, tokens }) => {
  console.log(req.session)
  const action = req.session.action === 'answer' ? answer : question
  return action(req, { config, enrollment, program, state, step, tokens })
}

export default questionStep
