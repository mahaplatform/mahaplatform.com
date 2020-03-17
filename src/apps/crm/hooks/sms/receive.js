import WorkflowEnrollment from '../../models/workflow_enrollment'
import { enrollInCampaign } from '../../services/sms_campaigns'
import generateCode from '../../../../core/utils/generate_code'
import { executeWorkflow } from '../../services/workflows'
import SMSCampaign from '../../models/sms_campaign'
import PhoneNumber from '../../models/phone_number'
import Contact from '../../models/contact'
import { getContact } from '../utils'
import moment from 'moment'

const getPhoneNumber = async (req, { number }) => {

  const phone_number = await PhoneNumber.query(qb => {
    qb.where('number', number)
  }).fetch({
    transacting: req.trx
  })

  if(phone_number) return phone_number

  const code = await generateCode(req, {
    table: 'crm_contacts'
  })

  const contact = await Contact.forge({
    team_id: req.team.get('id'),
    code
  }).save(null, {
    transacting: req.trx
  })

  return await PhoneNumber.forge({
    team_id: req.team.get('id'),
    contact_id: contact.get('id'),
    number,
    is_primary: true,
    is_valid: true
  }).save(null, {
    transacting: req.trx
  })

}

const receive = async (req, { sms, phone_number }) => {

  const from = await getPhoneNumber(req, {
    number: sms.related('from').get('number')
  })

  const enrollment = await WorkflowEnrollment.query(qb => {
    qb.innerJoin('crm_sms_campaigns', 'crm_sms_campaigns.id', 'crm_workflow_enrollments.sms_campaign_id')
    qb.where('crm_sms_campaigns.phone_number_id', phone_number.get('id'))
    qb.where('crm_workflow_enrollments.contact_id', from.get('contact_id'))
    qb.where('crm_workflow_enrollments.was_completed', false)
    qb.whereRaw('crm_workflow_enrollments.created_at >= ?', moment().subtract(2, 'hours'))
  }).fetch({
    transacting: req.trx
  })

  if(enrollment) {
    return await executeWorkflow(req, {
      enrollment_id: enrollment.get('id'),
      answer: sms.get('body')
    })
  }

  const sms_campaign = await SMSCampaign.query(qb => {
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
    sms_campaign,
    contact
  })

}

export default receive
