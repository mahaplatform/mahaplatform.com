import ExecuteWorkflowQueue from '@apps/automation/queues/execute_workflow_queue'
import WorkflowEnrollment from '@apps/automation/models/workflow_enrollment'
import { lookupNumber } from '@apps/maha/services/phone_numbers'
import { enrollInCampaign } from '@apps/campaigns/services/sms_campaigns'
import generateCode from '@core/utils/generate_code'
import socket from '@core/services/routes/emitter'
import PhoneNumber from '@apps/crm/models/phone_number'
import { updateConsent } from '@apps/crm/services/consents'
import SMSCampaign from '@apps/campaigns/models/sms_campaign'
import Contact from '@apps/crm/models/contact'
import { getContact } from '../utils'
import moment from 'moment'
import _ from 'lodash'

const getPhoneNumber = async (req, { number }) => {

  const phone_number = await PhoneNumber.query(qb => {
    qb.where('team_id', req.team.get('id'))
    qb.where('number', number)
  }).fetch({
    transacting: req.trx
  })

  if(phone_number) return phone_number

  const caller = await lookupNumber(req, {
    number
  })

  const code = await generateCode(req, {
    table: 'crm_contacts'
  })

  const contact = await Contact.forge({
    team_id: req.team.get('id'),
    code,
    first_name: caller.first_name,
    last_name: caller.last_name
  }).save(null, {
    transacting: req.trx
  })

  return await PhoneNumber.forge({
    team_id: req.team.get('id'),
    contact_id: contact.get('id'),
    number,
    is_primary: true,
    undelivered_count: 0,
    can_text: true
  }).save(null, {
    transacting: req.trx
  })

}

const receive = async (req, { sms, phone_number }) => {

  await phone_number.load(['program'], {
    transacting: req.trx
  })

  const from = await getPhoneNumber(req, {
    number: sms.related('from').get('number')
  })

  await sms.save({
    program_id: phone_number.related('program').get('id'),
    phone_number_id: from.get('id')
  }, {
    transacting: req.trx,
    patch: true
  })

  await socket.refresh(req, [
    `/admin/crm/programs/${phone_number.related('program').get('id')}/channels/sms/${from.get('id')}/smses`
  ])

  if(_.includes(['start','unstop'], sms.get('body').toLowerCase())) {
    await updateConsent(req, {
      channel_type: 'sms',
      channel_id: from.get('id'),
      program: phone_number.related('program'),
      optout: false
    })
  }

  const enrollment = await WorkflowEnrollment.query(qb => {
    qb.innerJoin('crm_sms_campaigns', 'crm_sms_campaigns.id', 'crm_workflow_enrollments.sms_campaign_id')
    qb.where('crm_sms_campaigns.phone_number_id', phone_number.get('id'))
    qb.where('crm_workflow_enrollments.contact_id', from.get('contact_id'))
    qb.where('crm_workflow_enrollments.status', 'active')
    qb.where('crm_workflow_enrollments.team_id', req.team.get('id'))
    qb.whereNull('crm_workflow_enrollments.unenrolled_at')
    qb.whereRaw('crm_workflow_enrollments.created_at >= ?', moment().subtract(2, 'hours'))
  }).fetch({
    transacting: req.trx
  })

  if(_.includes(['stop','stopall','unsubscribe','cancel','end','quit'], sms.get('body').toLowerCase())) {
    await updateConsent(req, {
      channel_type: 'sms',
      channel_id: from.get('id'),
      program: phone_number.related('program'),
      optout: true
    })
    if(!enrollment) return
    return await enrollment.save({
      was_opted_out: true,
      status: 'lost',
      unenrolled_at: moment()
    }, {
      transacting: req.trx,
      patch: true
    })
  }

  if(enrollment) {
    return await ExecuteWorkflowQueue.enqueue(req, {
      enrollment_id: enrollment.get('id'),
      answer: sms.get('body')
    })
  }

  const sms_campaign = await SMSCampaign.query(qb => {
    qb.where('team_id', req.team.get('id'))
    qb.where('phone_number_id', phone_number.get('id'))
    qb.where('direction', 'inbound')
    qb.whereRaw('lower(term) = ?', sms.get('body').toLowerCase())
    qb.where('status', 'active')
  }).fetch({
    transacting: req.trx
  })

  if(!sms_campaign) return

  const contact = await getContact(req, {
    number: sms.related('from').get('number')
  })

  await enrollInCampaign(req, {
    phone_number: from,
    sms_campaign,
    contact
  })

}

export default receive
