import executeWorkflowQueue from '../../../queues/execute_workflow_queue'
import WorkflowEnrollment from '../../../models/workflow_enrollment'
import socket from '../../../../../core/services/routes/emitter'
import WorkflowAction from '../../../models/workflow_action'
import WorkflowStep from '../../../models/workflow_step'
import sendInternalEmail from './send_internal_email'
import enrollInWorkflow from './enroll_in_workflow'
import sendInternalSms from './send_internal_sms'
import updateInterests from './update_interests'
import updateProperty from './update_property'
import updateConsent from './update_consent'
import updateLists from './update_lists'
import sendEmail from './send_email'
import sendSms from './send_sms'
import message from './message'
import ifthen from './ifthen'
import hangup from './hangup'
import moment from 'moment'
import wait from './wait'
import goal from './goal'
import play from './play'

const getExecutor = (type, action) => {
  if(type === 'administrative' && action === 'email') return sendInternalEmail
  if(type === 'administrative' && action === 'sms') return sendInternalSms
  if(type === 'communication' && action === 'email') return sendEmail
  if(type === 'communication' && action === 'sms') return sendSms
  if(type === 'control' && action === 'ifthen') return ifthen
  if(type === 'control' && action === 'wait') return wait
  if(type === 'control' && action === 'goal') return goal
  if(type === 'contact' && action === 'workflow') return enrollInWorkflow
  if(type === 'contact' && action === 'property') return updateProperty
  if(type === 'contact' && action === 'topic') return updateInterests
  if(type === 'contact' && action === 'consent') return updateConsent
  if(type === 'contact' && action === 'lists') return updateLists
  if(type === 'voice' && action === 'play') return play
  if(type === 'sms' && action === 'message') return message
}

const executeStep = async (req, { enrollment, step }) => {
  const executor = getExecutor(step.get('type'), step.get('action'))
  return await executor(req, {
    config: step.get('config'),
    enrollment,
    step
  })
}

const getCurrentStep = async (req, params) => {

  const { voice_campaign_id, sms_campaign_id, workflow_id, code } = params

  return await WorkflowStep.query(qb => {
    if(voice_campaign_id) qb.where({ voice_campaign_id })
    if(sms_campaign_id) qb.where({ sms_campaign_id })
    if(workflow_id) qb.where({ workflow_id })
    qb.where('is_active', true)
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

const getNextStep = async (req, params) => {
  const { voice_campaign_id, sms_campaign_id, workflow_id, parent, answer, delta } = params
  const nextStep = await WorkflowStep.query(qb => {
    if(voice_campaign_id) qb.where({ voice_campaign_id })
    if(sms_campaign_id) qb.where({ sms_campaign_id })
    if(workflow_id) qb.where({ workflow_id })
    qb.where('is_active', true)
    qb.where('parent', parent)
    qb.where('answer', answer)
    qb.where('delta', delta + 1)
  }).fetch({
    transacting: req.trx
  })
  if(nextStep) return nextStep
  const parentStep = await WorkflowStep.query(qb => {
    if(voice_campaign_id) qb.where({ voice_campaign_id })
    if(sms_campaign_id) qb.where({ sms_campaign_id })
    if(workflow_id) qb.where({ workflow_id })
    qb.where('is_active', true)
    qb.where('code', parent)
  }).fetch({
    transacting: req.trx
  })
  if(!parentStep) return null
  return await getNextStep(req, {
    voice_campaign_id,
    sms_campaign_id,
    workflow_id,
    parent: parentStep.get('parent'),
    answer: parentStep.get('answer'),
    delta: parentStep.get('delta')
  })
}

const refresh = async (req, { voice_campaign_id, sms_campaign_id, workflow_id }) => {
  if(voice_campaign_id) {
    await socket.refresh(req, [
      '/admin/crm/campaigns/voice',
      `/admin/crm/campaigns/voice/${voice_campaign_id}`
    ])
  } else if(sms_campaign_id) {
    await socket.refresh(req, [
      '/admin/crm/campaigns/sms',
      `/admin/crm/campaigns/sms/${sms_campaign_id}`
    ])
  } else if(sms_campaign_id) {
    await socket.refresh(req, [
      '/admin/crm/workflows',
      `/admin/crm/workflows/${workflow_id}`
    ])
  }
}

export const executeWorkflow = async (req, { enrollment_id, code, execute }) => {

  const enrollment = await WorkflowEnrollment.query(qb => {
    qb.where('id', enrollment_id)
  }).fetch({
    transacting: req.trx
  })

  const step = await getCurrentStep(req, {
    voice_campaign_id: enrollment.get('voice_campaign_id'),
    sms_campaign_id: enrollment.get('sms_campaign_id'),
    workflow_id: enrollment.get('workflow_id'),
    code
  })

  const result = (execute !== false) ? await executeStep(req, {
    step,
    enrollment
  }) : {}

  if(result.twiml) return result

  const { condition, until, unenroll } = result

  await WorkflowAction.forge({
    team_id: req.team.get('id'),
    enrollment_id: enrollment.get('id'),
    step_id: step.get('id')
  }).save(null, {
    transacting: req.trx
  })

  if(unenroll) {
    return await enrollment.save({
      unenrolled_at: moment()
    }, {
      transacting: req.trx
    })
  }

  const next = await getNextStep(req, {
    voice_campaign_id: enrollment.get('voice_campaign_id'),
    sms_campaign_id: enrollment.get('sms_campaign_id'),
    workflow_id: enrollment.get('workflow_id'),
    parent: condition ? condition.parent : step.get('parent'),
    answer: condition ? condition.answer : step.get('parent'),
    delta: condition ? condition.delta : step.get('delta')
  })

  await refresh(req, {
    voice_campaign_id: enrollment.get('voice_campaign_id'),
    sms_campaign_id: enrollment.get('sms_campaign_id'),
    workflow_id: enrollment.get('workflow_id')
  })

  if(next && enrollment.get('voice_campaign_id')) {
    return executeWorkflow(req, {
      enrollment_id: enrollment.get('id'),
      code: next.get('code')
    })
  }

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

  if(enrollment.get('voice_campaign_id')) {
    return hangup()
  }

}
