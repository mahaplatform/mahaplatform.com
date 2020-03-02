import executeWorkflowQueue from '../../../queues/execute_workflow_queue'
import WorkflowAction from '../../../models/workflow_action'
import WorkflowStep from '../../../models/workflow_step'
import { updateInterests } from './update_interests'
import { updateConsent } from './update_consent'
import { updateLists } from './update_lists'
import { conditional } from './conditional'
import { sendEmail } from './send_email'
import { wait } from './wait'
import { goal } from './goal'

const getExecutor = (action) => {
  if(action === 'send_email') return sendEmail
  if(action === 'consent') return updateConsent
  if(action === 'interests') return updateInterests
  if(action === 'lists') return updateLists
  if(action === 'conditional') return conditional
  if(action === 'wait') return wait
  if(action === 'goal') return goal
}

const executeStep = async (req, { enrollment, step }) => {
  const executor = getExecutor(step.get('action'))
  return await executor(req, {
    config: step.get('config'),
    enrollment,
    step
  })
}

const getCurrentStep = async (req, { workflow_id, code }) => {
  return await WorkflowStep.query(qb => {
    qb.where('workflow_id', workflow_id)
    if(code) {
      qb.where('code', code)
    } else {
      qb.where('parent', null)
      qb.where('answer', null)
      qb.where('delta', 0)
    }
  }).fetch({
    transacting: req.trx
  })
}

const getNextStep = async (req, { workflow_id, parent, answer, delta }) => {
  const nextStep = await WorkflowStep.query(qb => {
    qb.where('workflow_id', workflow_id)
    qb.where('parent', parent)
    qb.where('answer', answer)
    qb.where('delta', delta + 1)
  }).fetch({
    transacting: req.trx
  })
  if(nextStep) return nextStep
  const parentStep = await WorkflowStep.query(qb => {
    qb.where('workflow_id', workflow_id)
    qb.where('code', parent)
  }).fetch({
    transacting: req.trx
  })
  if(!parentStep) return null
  return await getNextStep(req, {
    workflow_id,
    parent: parentStep.get('parent'),
    answer: parentStep.get('answer'),
    delta: parentStep.get('delta')
  })
}

export const executeWorkflow = async (req, { enrollment, code }) => {

  const step = await getCurrentStep(req, {
    workflow_id: enrollment.get('workflow_id'),
    code
  })

  const { condition, until } = await executeStep(req, {
    step,
    enrollment
  })

  await WorkflowAction.forge({
    team_id: req.team.get('id'),
    enrollment_id: enrollment.get('id'),
    step_id: step.get('id')
  }).save(null, {
    transacting: req.trx
  })

  const next = await getNextStep(req, {
    workflow_id: enrollment.get('workflow_id'),
    parent: condition ? condition.parent : step.get('parent'),
    answer: condition ? condition.answer : step.get('parent'),
    delta: condition ? condition.delta : step.get('delta')
  })

  if(next) {
    return await executeWorkflowQueue.enqueue(req, {
      enrollment_id: enrollment.get('id'),
      code: next.get('code')
    }, {
      until
    })
  }

  await enrollment.save({
    was_completed: true
  }, {
    transacting: req.trx,
    patch: true
  })

}
