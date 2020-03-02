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

const executeStep = async (req, { enrollment, step }) => {

  const config = step.get('config')

  if(step.get('action') === 'send_email') {
    return await sendEmail(req, {
      email_id: config.email.id,
      enrollment
    })
  }

  if(step.get('action') === 'consent') {
    return await updateConsent(req, {
      ...config,
      enrollment
    })
  }

  if(step.get('action') === 'interests') {
    return await updateInterests(req, {
      enrollment,
      topic_id: config.topic.id
    })
  }

  if(step.get('action') === 'lists') {
    return await updateLists(req, {
      enrollment,
      list_id: config.list.id
    })
  }

  if(step.get('action') === 'wait') {
    return await wait(req, {
      ...config
    })
  }

  if(step.get('action') === 'goal') {
    return await goal(req, {
      enrollment
    })
  }

  if(step.get('action') === 'conditional') {
    return await conditional(req, {
      enrollment,
      step
    })
  }

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
    await executeWorkflowQueue.enqueue(req, {
      enrollment_id: enrollment.get('id'),
      code: next.get('code')
    }, {
      until
    })
  } else {
    await enrollment.save({
      was_completed: true
    }, {
      transacting: req.trx,
      patch: true
    })
  }

}
