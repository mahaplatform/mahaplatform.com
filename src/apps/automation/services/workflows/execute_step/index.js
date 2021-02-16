import executors from './steps'
import _ from 'lodash'

const executeStep = async (req, params) => {
  const state = params.state || 'steps.0'
  const step = _.get(params.config, state)
  const executor = _.get(executors, `${step.type}.${step.action}`)
  if(!executor) throw new Error('no executor')
  return await executor(req, {
    config: params.config,
    contact: params.contact,
    enrollment: params.enrollment,
    program: params.program,
    state,
    step,
    tokens: params.tokens,
    twiml: params.twiml
  })
}

export default executeStep
