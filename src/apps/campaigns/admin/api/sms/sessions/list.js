import EnrollmentSerializer from '@apps/automation/serializers/enrollment_serializer'
import WorkflowEnrollment from '@apps/automation/models/workflow_enrollment'
import SmsCampaign from '../../../../models/sms_campaign'

const listRoute = async (req, res) => {

  const campaign = await SmsCampaign.query(qb => {
    qb.where('team_id', req.team.get('id'))
    qb.where('id', req.params.campaign_id)
  }).fetch({
    transacting: req.trx
  })

  if(!campaign) return res.status(404).respond({
    code: 404,
    message: 'Unable to load campaign'
  })

  const enrollments = await WorkflowEnrollment.filterFetch({
    scope: (qb) => {
      qb.innerJoin('crm_contacts','crm_contacts.id','crm_workflow_enrollments.contact_id')
      qb.where('crm_workflow_enrollments.team_id', req.team.get('id'))
      qb.where('crm_workflow_enrollments.sms_campaign_id', campaign.get('id'))
    },
    aliases: {
      first_name: 'crm_contacts.first_name',
      last_name: 'crm_contacts.last_name'
    },
    filter: {
      params: req.query.$filter,
      allowed: ['was_converted'],
      search: ['first_name','last_name']
    },
    sort: {
      params: req.query.$sort,
      defaults:  '-created_at',
      allowed: ['created_at']
    },
    page: req.query.$page,
    withRelated: ['contact.photo'],
    transacting: req.trx
  })

  res.status(200).respond(enrollments, EnrollmentSerializer)

}

export default listRoute
