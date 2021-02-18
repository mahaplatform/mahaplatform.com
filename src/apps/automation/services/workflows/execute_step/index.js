import WorkflowAction from '@apps/automation/models/workflow_action'
import executors from './steps'
import _ from 'lodash'

const executeStep = async (req, params) => {

  const { config, contact, enrollment, program, twiml, tokens } = params

  const state = params.state || 'steps.0'

  const step = _.get(config, state)

  if(!step) return { twiml: params.twiml }

  const executor = _.get(executors, `${step.type}.${step.action}`)

  const result = await executor(req, {
    config,
    contact,
    enrollment,
    program,
    state,
    step,
    tokens,
    twiml
  })

  if(result.action) {
    await WorkflowAction.forge({
      team_id: req.team.get('id'),
      enrollment_id: enrollment.get('id'),
      step: {
        type: step.type,
        action: step.action,
        config: step.config
      },
      ...result.action
    }).save(null, {
      transacting: req.trx
    })
  }

  if(result.data || result.until) {
    await enrollment.save({
      ...enrollment.get('data') || {},
      ...result.until ? { until: result.until } : {},
      data: result.data
    }, {
      transacting: req.trx,
      patch: true
    })
  }

  if(result.converted) {
    await enrollment.save({
      was_converted: true
    }, {
      transacting: req.trx,
      patch: true
    })
  }

  return result

}

export default executeStep
