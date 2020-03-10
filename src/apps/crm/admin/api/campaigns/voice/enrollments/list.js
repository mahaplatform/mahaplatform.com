import EnrollmentSerializer from '../../../../../serializers/enrollment_serializer'
import WorkflowEnrollment from '../../../../../models/workflow_enrollment'
import VoiceCampaign from '../../../../../models/voice_campaign'

const listRoute = async (req, res) => {

  const campaign = await VoiceCampaign.query(qb => {
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
      qb.where('team_id', req.team.get('id'))
      qb.where('voice_campaign_id', campaign.get('id'))
    },
    filter: {
      params: req.query.$filter,
      allowed: ['was_converted']
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
