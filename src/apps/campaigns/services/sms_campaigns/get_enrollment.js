import WorkflowEnrollment from '@apps/automation/models/workflow_enrollment'
import SMSCampaign from '@apps/campaigns/models/sms_campaign'
import enrollInCampaign from './enroll_in_campaign'
import moment from 'moment'

const getEnrollment = async (req, { from, phone_number, sms }) => {

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

  if(enrollment) return enrollment

  const sms_campaign = await SMSCampaign.query(qb => {
    qb.where('team_id', req.team.get('id'))
    qb.where('phone_number_id', phone_number.get('id'))
    qb.where('direction', 'inbound')
    qb.whereRaw('lower(term) = ?', sms.get('body').toLowerCase())
    qb.where('status', 'active')
  }).fetch({
    transacting: req.trx
  })

  if(!sms_campaign) return null

  return await enrollInCampaign(req, {
    phone_number: from,
    sms_campaign,
    contact: from.related('contact')
  })
}

export default getEnrollment
