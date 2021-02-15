import executors from './steps'
import _ from 'lodash'

const executeStep = async (req, params) => {
  const state = req.query.state || 'steps.0'
  const step = _.get(params.config, state)
  console.log(params.config, state, step)
  const { type, action } = step
  const executor = executors[type][action]
  return await executor(req, {
    config: params.config,
    contact: params.contact,
    program: params.program,
    state,
    step,
    tokens: params.tokens,
    twiml: params.twiml
  })
}

export default executeStep
