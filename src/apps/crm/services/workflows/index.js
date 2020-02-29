import executeWorkflowQueue from '../../queues/execute_workflow_queue'
import { updateInterests } from './update_interests'
import { updateConsent } from './update_consent'
import { updateLists } from './update_lists'
import { sendEmail } from './send_email'
import { wait } from './wait'
import { goal } from './goal'

const executeStep = async (req, { contact, enrollment, step }) => {

  if(step.action === 'send_email') {
    return await sendEmail(req, {
      response: enrollment.related('response'),
      email_id: step.config.email.id
    })
  }

  if(step.action === 'consent') {
    return await updateConsent(req, {
      contact,
      channel: step.config.channel
    })
  }

  if(step.action === 'interests') {
    return await updateInterests(req, {
      contact,
      topic_id: step.config.topic.id
    })
  }

  if(step.action === 'lists') {
    return await updateLists(req, {
      contact,
      list_id: step.config.list.id
    })
  }

  if(step.action === 'wait') {
    return await wait(req, {
      contact,
      ...step.config
    })
  }

  if(step.action === 'goal') {
    return await goal(req, {
      enrollment
    })
  }

}

const getStep = (steps, code) => {
  const index = Math.max(0, steps.findIndex(step => {
    return code ? (step.code === code) : (index === 0)
  }))
  return {
    current: steps[index],
    next: steps[index + 1]
  }
}

export const executeWorkflow = async (req, { enrollment, step }) => {

  await enrollment.load(['contact','response','workflow'], {
    transacting: req.trx
  })

  const workflow = enrollment.related('workflow')

  const contact = enrollment.related('contact')

  const config = workflow.get('config')

  const { current, next } = getStep(config.steps, step)

  console.log(current, next)

  const until = await executeStep(req, {
    contact,
    step: current,
    enrollment
  })

  if(next) {
    await executeWorkflowQueue.enqueue(req, {
      enrollment_id: enrollment.get('id'),
      step: next.code
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
