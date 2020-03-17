import executeWorkflowQueue from '../../../queues/execute_workflow_queue'
import WorkflowEnrollment from '../../../models/workflow_enrollment'
import socket from '../../../../../core/services/routes/emitter'
import WorkflowAction from '../../../models/workflow_action'
import sendInternalEmail from './send_internal_email'
import contactWorkflow from './enroll_in_workflow'
import sendInternalSms from './send_internal_sms'
import contactProperty from './update_property'
import contactConsent from './update_consent'
import contactTopic from './update_interests'
import Contact from '../../../models/contact'
import voiceQuestion from './voice_question'
import smsQuestion from './sms_question'
import contactList from './update_lists'
import sendEmail from './send_email'
import controlIfThen from './ifthen'
import smsMessage from './message'
import sendSms from './send_sms'
import controlWait from './wait'
import controlGoal from './goal'
import voicePlay from './play'
import hangup from './hangup'
import voiceSay from './say'
import moment from 'moment'
import _ from 'lodash'

const getExecutor = (type, action) => {
  if(type === 'administrative' && action === 'email') return sendInternalEmail
  if(type === 'administrative' && action === 'sms') return sendInternalSms
  if(type === 'communication' && action === 'email') return sendEmail
  if(type === 'communication' && action === 'sms') return sendSms
  if(type === 'control' && action === 'ifthen') return controlIfThen
  if(type === 'control' && action === 'wait') return controlWait
  if(type === 'control' && action === 'goal') return controlGoal
  if(type === 'contact' && action === 'workflow') return contactWorkflow
  if(type === 'contact' && action === 'property') return contactProperty
  if(type === 'contact' && action === 'topic') return contactTopic
  if(type === 'contact' && action === 'consent') return contactConsent
  if(type === 'contact' && action === 'lists') return contactList
  if(type === 'voice' && action === 'play') return voicePlay
  if(type === 'voice' && action === 'say') return voiceSay
  if(type === 'voice' && action === 'question') return voiceQuestion
  if(type === 'sms' && action === 'message') return smsMessage
  if(type === 'sms' && action === 'question') return smsQuestion
}

const executeStep = async (req, { answer, contact, enrollment, execute, step, tokens }) => {
  if(execute === false) return {}
  const executor = getExecutor(step.get('type'), step.get('action'))
  return await executor(req, {
    answer,
    config: step.get('config'),
    contact,
    enrollment,
    step,
    tokens
  })
}

const getCurrentStep = async (req, { enrollment, code, steps }) => {
  const last_completed_action = await WorkflowAction.query(qb => {
    qb.where('enrollment_id', enrollment.get('id'))
    qb.orderBy('created_at', 'desc')
  }).fetch({
    transacting: req.trx
  })
  if(last_completed_action) {
    const step = steps.find(step => {
      return step.get('id') === last_completed_action.get('step_id')
    })
    return await getNextStep(req, {
      steps,
      parent: step.get('parent'),
      answer: step.get('answer'),
      delta: step.get('delta')
    })
  }
  return steps.find(step => {
    if(code) return step.get('code') === code
    return step.get('parent') === null && step.get('answer') === null && step.get('delta') === 0
  })
}

const getNextStep = async (req, { parent, answer, delta, steps }) => {
  const nextStep = steps.find(step => {
    return step.get('parent') === parent && step.get('answer') === answer && step.get('delta') === delta + 1
  })
  if(nextStep) return nextStep
  const parentStep = steps.find(step => {
    return step.get('code') === parent
  })
  if(!parentStep) return null
  return await getNextStep(req, {
    steps,
    parent: parentStep.get('parent'),
    answer: parentStep.get('answer'),
    delta: parentStep.get('delta')
  })
}

const getWorkflow = async (req, { enrollment }) => {
  if(enrollment.get('voice_campaign_id')) return enrollment.related('voice_campaign')
  if(enrollment.get('sms_campaign_id')) return enrollment.related('sms_campaign')
  if(enrollment.get('workflow_id')) return enrollment.related('workflow')
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

const getTokens = async(req, { contact, enrollment, steps }) => {
  const data = enrollment.get('data')
  return {
    contact: {
      full_name: contact.get('full_name'),
      first_name: contact.get('full_name'),
      last_name: contact.get('full_name'),
      email: contact.get('email'),
      phone: contact.get('phone'),
      address: contact.get('address')
    },
    workflow: steps.filter((step) => {
      return _.includes(['set','question','record'], step.get('action'))
    }).reduce((tokens, step) => ({
      ...tokens,
      [step.get('config').name.token]: data[step.get('config').code]
    }), {})
  }
}

export const executeWorkflow = async (req, { enrollment_id, code, execute, answer }) => {

  const enrollment = await WorkflowEnrollment.query(qb => {
    qb.where('id', enrollment_id)
  }).fetch({
    withRelated: ['workflow.steps','sms_campaign.steps','voice_campaign.steps'],
    transacting: req.trx
  })

  const contact = await Contact.query(qb => {
    qb.select(req.trx.raw('crm_contacts.*,crm_contact_primaries.*'))
    qb.leftJoin('crm_contact_primaries', 'crm_contact_primaries.contact_id', 'crm_contacts.id')
    qb.where('crm_contacts.id', enrollment.get('contact_id'))
  }).fetch({
    transacting: req.trx
  })

  const workflow = await getWorkflow(req, {
    enrollment
  })

  const steps = workflow.related('steps').toArray()

  const step = await getCurrentStep(req, {
    enrollment,
    code,
    steps
  })

  const tokens = await getTokens(req, {
    contact,
    enrollment,
    steps
  })

  const { condition, data, twiml, until, unenroll, wait } = await executeStep(req, {
    answer,
    contact,
    enrollment,
    execute,
    step,
    tokens
  })

  if(twiml) return { twiml }

  if(wait === true) return

  await WorkflowAction.forge({
    team_id: req.team.get('id'),
    enrollment_id: enrollment.get('id'),
    step_id: step.get('id'),
    data: data || {}
  }).save(null, {
    transacting: req.trx
  })

  if(data) {
    await enrollment.save({
      data: {
        ...enrollment.get('data'),
        ...data
      }
    }, {
      transacting: req.trx,
      patch: true
    })
  }

  if(unenroll === true) {
    return await enrollment.save({
      unenrolled_at: moment()
    }, {
      transacting: req.trx,
      patch: true
    })
  }

  const next = await getNextStep(req, {
    steps,
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

  if(enrollment.get('voice_campaign_id')) {
    return hangup()
  }

  return {}

}
