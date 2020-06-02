import SaveWorkflowRecordingQueue from '../../../queues/save_workflow_recording_queue'
import executeWorkflowQueue from '../../../queues/execute_workflow_queue'
import WorkflowEnrollment from '../../../models/workflow_enrollment'
import WorkflowRecording from '../../../models/workflow_recording'
import generateCode from '../../../../../core/utils/generate_code'
import socket from '../../../../../core/services/routes/emitter'
import WorkflowAction from '../../../models/workflow_action'
import sendInternalEmail from './send_internal_email'
import contactWorkflow from './enroll_in_workflow'
import sendInternalSms from './send_internal_sms'
import contactProperty from './update_property'
import contactConsent from './update_consent'
import Contact from '../../../models/contact'
import voiceQuestion from './voice_question'
import contactTopic from './update_topics'
import smsQuestion from './sms_question'
import contactList from './update_lists'
import voiceRecord from './voice_record'
import voiceDial from './voice_dial'
import sendEmail from './send_email'
import controlIfThen from './ifthen'
import voicePlay from './voice_play'
import voiceSay from './voice_say'
import smsMessage from './sms_message'
import sendSms from './send_sms'
import controlWait from './wait'
import controlGoal from './goal'
import controlSet from './set'
import hangup from './hangup'
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
  if(type === 'control' && action === 'set') return controlSet
  if(type === 'contact' && action === 'workflow') return contactWorkflow
  if(type === 'contact' && action === 'property') return contactProperty
  if(type === 'contact' && action === 'topic') return contactTopic
  if(type === 'contact' && action === 'consent') return contactConsent
  if(type === 'contact' && action === 'list') return contactList
  if(type === 'voice' && action === 'play') return voicePlay
  if(type === 'voice' && action === 'say') return voiceSay
  if(type === 'voice' && action === 'question') return voiceQuestion
  if(type === 'voice' && action === 'record') return voiceRecord
  if(type === 'voice' && action === 'dial') return voiceDial
  if(type === 'sms' && action === 'message') return smsMessage
  if(type === 'sms' && action === 'question') return smsQuestion
}

const executeStep = async (req, params) => {
  const { answer, call, contact, enrollment, execute, step, steps, recording, tokens, workflow } = params
  const executor = getExecutor(step.get('type'), step.get('action'))
  return await executor(req, {
    answer,
    call,
    config: step.get('config'),
    contact,
    enrollment,
    execute,
    recording,
    step,
    steps,
    tokens,
    workflow
  })
}

const getCurrentStep = async (req, { enrollment, code, steps }) => {
  if(code) {
    return steps.find(step => {
      return step.get('code') === code
    })
  }
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
  if(enrollment.get('voice_campaign_id')) {
    await enrollment.load(['voice_campaign.program.fields','voice_campaign.steps','voice_campaign.phone_number','call','phone_number'], {
      transacting: req.trx
    })
    return enrollment.related('voice_campaign')
  }
  if(enrollment.get('sms_campaign_id')) {
    await enrollment.load(['sms_campaign.program.fields','sms_campaign.steps','sms_campaign.phone_number','phone_number'], {
      transacting: req.trx
    })
    return enrollment.related('sms_campaign')
  }
  if(enrollment.get('workflow_id')) {
    await enrollment.load(['workflow.program.fields','workflow.steps'], {
      transacting: req.trx
    })
    return enrollment.related('workflow')
  }
}

const refresh = async (req, { enrollment }) => {
  await socket.refresh(req, [
    ...enrollment.get('voice_campaign_id') ? [
      '/admin/crm/campaigns/voice',
      `/admin/crm/campaigns/voice/${enrollment.get('voice_campaign_id')}`,
      `/admin/crm/campaigns/voice/${enrollment.get('voice_campaign_id')}/calls`
    ] : [],
    ...enrollment.get('sms_campaign_id') ? [
      '/admin/crm/campaigns/sms',
      `/admin/crm/campaigns/sms/${enrollment.get('sms_campaign_id')}`,
      `/admin/crm/campaigns/sms/${enrollment.get('sms_campaign_id')}/sessions`
    ] : [],
    ...enrollment.get('workflow_id') ? [
      '/admin/crm/workflows',
      `/admin/crm/workflows/${enrollment.get('workflow_id')}`,
      `/admin/crm/workflows/${enrollment.get('voice_campaign_id')}/enrollments`
    ] : []
  ])
}

const getTokens = async(req, { contact, enrollment, program, steps, workflow }) => ({
  contact: {
    full_name: contact.get('full_name'),
    first_name: contact.get('first_name'),
    last_name: contact.get('last_name'),
    email: contact.get('email'),
    phone: contact.get('phone'),
    address: contact.get('address'),
    birthday: contact.get('birthday'),
    spouse: contact.get('spouse'),
    url: contact.get('url')
  },
  program: program.related('fields').reduce((programvalues, field) => ({
    ...programvalues,
    [field.get('name').token]: _.get(contact.get('values'), `${field.get('code')}[0]`)
  }), {}),
  ...enrollment.get('voice_campaign_id') ? {
    call: workflow.get('direction') === 'inbound' ? {
      from_number: enrollment.related('phone_number').get('formatted'),
      from_number_spoken: enrollment.related('phone_number').get('spoken'),
      to_number: workflow.related('phone_number').get('formatted'),
      to_number_spoken: workflow.related('phone_number').get('spoken')
    } : {
      from_number: workflow.related('phone_number').get('formatted'),
      from_number_spoken: workflow.related('phone_number').get('spoken'),
      to_number: enrollment.related('phone_number').get('formatted'),
      to_number_spoken: enrollment.related('phone_number').get('spoken')
    }
  } : {},
  ...enrollment.get('sms_campaign_id') ? {
    session: workflow.get('direction') === 'inbound' ? {
      from_number: enrollment.related('phone_number').get('formatted'),
      to_number: workflow.related('phone_number').get('formatted')
    } : {
      from_number: workflow.related('phone_number').get('formatted'),
      to_number: enrollment.related('phone_number').get('formatted')
    }
  } : {},
  workflow: steps.filter((step) => {
    return _.includes(['set','question','record'], step.get('action'))
  }).reduce((tokens, step) => ({
    ...tokens,
    ...getToken(step.get('action'), step.get('config'), enrollment.get('data'))
  }), {})
})

const getToken = (action, config, data) => {
  const key = action === 'record' ? `${config.name.token}_recording_url` : config.name.token
  return {
    [key]: data[config.code]
  }
}

const saveRecording = async(req, { action, recording_data }) => {

  const { url, duration } = recording_data

  const code = await generateCode(req, {
    table: 'crm_workflow_recordings'
  })

  const recording = await WorkflowRecording.forge({
    team_id: req.team.get('id'),
    action_id: action.get('id'),
    code,
    duration
  }).save(null, {
    transacting: req.trx
  })

  await SaveWorkflowRecordingQueue.enqueue(req, {
    recording_id: recording.get('id'),
    action_id: action.get('id'),
    url: url
  })

  return recording

}

const saveResults = async (req, params) => {

  const { converted, enrollment, step, recording_data, unenroll, until } = params

  params.action = params.action || {}

  params.action.data = params.action.data || {}

  const action = await WorkflowAction.forge({
    team_id: req.team.get('id'),
    enrollment_id: enrollment.get('id'),
    step_id: step.get('id'),
    waited_until: until
  }).save(null, {
    transacting: req.trx
  })

  if(recording_data) {

    const recording = await saveRecording(req, {
      action,
      recording_data
    })

    params.action.data[step.get('config').code] = recording.get('url')

  }

  await action.save({
    ...params.action
  }, {
    transacting: req.trx,
    patch: true
  })

  await enrollment.save({
    data: {
      ...enrollment.get('data') || {},
      ...params.action.data
    },
    ...converted ? {
      was_converted: true
    }: {},
    ...unenroll ? {
      status: 'lost',
      unenrolled_at: moment()
    }: {}
  }, {
    transacting: req.trx,
    patch: true
  })

}

const completeEnrollment = async (req, { enrollment, unenroll }) => {

  if(!unenroll) {
    await enrollment.save({
      completed_at: moment(),
      status: 'completed'
    }, {
      transacting: req.trx,
      patch: true
    })
  }

  return enrollment.get('voice_campaign_id') ? hangup() : {}

}

const executeWorkflow = async (req, params) => {

  const { answer, call, code, enrollment_id, execute, recording } = params

  const enrollment = await WorkflowEnrollment.query(qb => {
    qb.where('id', enrollment_id)
  }).fetch({
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

  if(!step) {
    return await completeEnrollment(req, {
      enrollment
    })
  }

  const tokens = await getTokens(req, {
    contact,
    enrollment,
    program: workflow.related('program'),
    steps,
    workflow
  })

  const result = await executeStep(req, {
    answer,
    call,
    contact,
    enrollment,
    execute,
    step,
    steps,
    recording,
    tokens,
    workflow
  })

  const { action, condition, converted, recording_data, twiml, unenroll, until, wait } = result

  if(twiml) return { twiml }

  if(wait === true) return

  await saveResults(req, {
    action,
    enrollment,
    converted,
    recording_data,
    step,
    unenroll,
    until
  })

  const next = !unenroll ? await getNextStep(req, {
    steps,
    parent: condition ? condition.parent : step.get('parent'),
    answer: condition ? condition.answer : step.get('answer'),
    delta: condition ? condition.delta : step.get('delta')
  }) : null

  await refresh(req, {
    enrollment
  })

  if(!next) {
    return await completeEnrollment(req, {
      unenroll,
      enrollment
    })
  }

  if(until || enrollment.get('workflow_id')) {
    return await executeWorkflowQueue.enqueue(req, {
      enrollment_id: enrollment.get('id'),
      code: next.get('code')
    }, {
      until
    })
  }

  return await executeWorkflow(req, {
    enrollment_id: enrollment.get('id'),
    code: next.get('code')
  })

}

export default executeWorkflow
