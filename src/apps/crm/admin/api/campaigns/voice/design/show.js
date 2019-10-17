import WorkflowSerializer from '../../../../../serializers/workflow_serializer'
import VoiceCampaign from '../../../../../models/voice_campaign'

const showRoute = async (req, res) => {

  const campaign = await VoiceCampaign.scope(qb => {
    qb.where('team_id', req.team.get('id'))
  }).query(qb => {
    qb.where('code', req.params.campaign_id)
  }).fetch({
    withRelated: ['workflow.steps.parent'],
    transacting: req.trx
  })

  if(!campaign) return res.status(404).respond({
    code: 404,
    message: 'Unable to load campaign'
  })

  res.status(200).respond(campaign.related('workflow'), WorkflowSerializer)

}

export default showRoute
