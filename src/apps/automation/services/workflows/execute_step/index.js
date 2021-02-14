import executors from './steps'
import _ from 'lodash'

const executeStep = async (req, params) => {
  const state = params.state || 'steps.0'
  const step = _.get(params.config, state)
  const { type, action } = step
  const executor = executors[type][action]
  return await executor(req, {
    config: params.config,
    contact: params.contact,
    program: params.program,
    state: params.state,
    step,
    tokens: params.tokens
  })
}

export default executeStep
