import SaveWorkflowRecordingQueue from '@apps/automation/queues/save_workflow_recording_queue'
import executeWorkflowQueue from '@apps/automation/queues/execute_workflow_queue'
import WorkflowEnrollment from '@apps/automation/models/enrollment'
import WorkflowRecording from '@apps/automation/models/recording'
import generateCode from '@core/utils/generate_code'
import socket from '@core/services/routes/emitter'
import WorkflowAction from '@apps/automation/models/action'
import Contact from '@apps/crm/models/contact'
import Field from '@apps/maha/models/field'
import hangup from './steps/voice/hangup'
import executors from './steps'
import moment from 'moment'
import _ from 'lodash'

const executeStep = async (req, params) => {
  const { answer, contact, dial, enrollment, execute, fields, step, steps, recording, tokens, workflow } = params
  const executor = executors[step.get('type')][step.get('action')]
  return await executor(req, {
    answer,
    config: step.get('config'),
    contact,
    dial,
    enrollment,
    execute,
    fields,
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
      '/admin/campaigns/voice',
      `/admin/campaigns/voice/${enrollment.get('voice_campaign_id')}`,
      `/admin/campaigns/voice/${enrollment.get('voice_campaign_id')}/calls`
    ] : [],
    ...enrollment.get('sms_campaign_id') ? [
      '/admin/campaigns/sms',
      `/admin/campaigns/sms/${enrollment.get('sms_campaign_id')}`,
      `/admin/campaigns/sms/${enrollment.get('sms_campaign_id')}/sessions`
    ] : [],
    ...enrollment.get('workflow_id') ? [
      '/admin/automation/workflows',
      `/admin/automation/workflows/${enrollment.get('workflow_id')}`,
      `/admin/automation/workflows/${enrollment.get('voice_campaign_id')}/enrollments`
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
    address: contact.get('fulladdress'),
    birthday: contact.get('birthday'),
    spouse: contact.get('spouse'),
    maha_url: contact.get('url'),
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
    return _.includes(['set','question','record','voicemail'], step.get('action'))
  }).reduce((tokens, step) => ({
    ...tokens,
    ...getToken(step.get('action'), step.get('config'), enrollment.get('data'))
  }), {})
})

const getToken = (action, config, data) => {
  const key = _.includes(['record','voicemail'], action) ? `${config.name.token}_url` : config.name.token
  return {
    [key]: data[config.code]
  }
}

const saveRecording = async(req, { action, recording_data }) => {

  const { url, duration } = recording_data

  const code = await generateCode(req, {
    table: 'automation_recordings'
  })

  const recording = await WorkflowRecording.forge({
    team_id: req.team.get('id'),
    action_id: action.get('id'),
    code,
    duration,
    was_heard: false,
    was_handled: false
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

    params.action.data[step.get('config').code] = `${process.env.WEB_HOST}/admin/campaigns/voice/${enrollment.get('voice_campaign_id')}/voicemails/${recording.get('id')}`

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

  const { answer, code, dial, enrollment_id, execute, recording } = params

  const enrollment = await WorkflowEnrollment.query(qb => {
    qb.where('team_id', req.team.get('id'))
    qb.where('id', enrollment_id)
    qb.where('status', 'active')
  }).fetch({
    transacting: req.trx
  })

  if(!enrollment) return

  const contact = await Contact.query(qb => {
    qb.select(req.trx.raw('crm_contacts.*,crm_contact_primaries.*'))
    qb.leftJoin('crm_contact_primaries', 'crm_contact_primaries.contact_id', 'crm_contacts.id')
    qb.where('crm_contacts.id', enrollment.get('contact_id'))
    qb.where('team_id', req.team.get('id'))
  }).fetch({
    transacting: req.trx
  })

  const fields = await Field.query(qb => {
    qb.where('parent_type', 'crm_programs')
    qb.where('team_id', req.team.get('id'))
  }).fetchAll({
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
    contact,
    dial,
    enrollment,
    execute,
    fields,
    step,
    steps,
    recording,
    tokens,
    workflow
  })

  const { action, condition, converted, recording_data, twiml, unenroll, until, wait } = result

  const call_status = result.call_status || params.call_status

  if(call_status === 'in-progress' && twiml) return { twiml }

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
    call_status,
    code: next.get('code')
  })

}

export default executeWorkflow
