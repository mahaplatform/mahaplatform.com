import EnrollmentSerializer from '../../../../../serializers/enrollment_serializer'
import WorkflowEnrollment from '../../../../../models/workflow_enrollment'
import SmsCampaign from '../../../../../models/sms_campaign'

const showRoute = async (req, res) => {

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

  const enrollment = await WorkflowEnrollment.query(qb => {
    qb.where('team_id', req.team.get('id'))
    qb.where('sms_campaign_id', campaign.get('id'))
    qb.where('id', req.params.id)
  }).fetch({
    withRelated: ['contact.photo','actions.step'],
    transacting: req.trx
  })

  res.status(200).respond(enrollment, EnrollmentSerializer)

}

export default showRoute
