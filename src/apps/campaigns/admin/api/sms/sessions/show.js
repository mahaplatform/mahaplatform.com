import EnrollmentSerializer from '@apps/automation/serializers/enrollment_serializer'
import WorkflowEnrollment from '@apps/automation/models/workflow_enrollment'
import SmsCampaign from '@apps/campaigns/models/sms_campaign'

const showRoute = async (req, res) => {

  const sms_campaign = await SmsCampaign.query(qb => {
    qb.where('team_id', req.team.get('id'))
    qb.where('id', req.params.campaign_id)
  }).fetch({
    transacting: req.trx
  })

  if(!sms_campaign) return res.status(404).respond({
    code: 404,
    message: 'Unable to load campaign'
  })

  const enrollment = await WorkflowEnrollment.query(qb => {
    qb.where('team_id', req.team.get('id'))
    qb.where('sms_campaign_id', sms_campaign.get('id'))
    qb.where('id', req.params.id)
  }).fetch({
    withRelated: ['contact.photo'],
    transacting: req.trx
  })

  res.status(200).respond(enrollment, EnrollmentSerializer)

}

export default showRoute
