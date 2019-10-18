import WorkflowSerializer from '../../../../../serializers/workflow_serializer'
import VoiceCampaign from '../../../../../models/voice_campaign'

const updateRoute = async (req, res) => {

  const campaign = await VoiceCampaign.scope(qb => {
    qb.where('team_id', req.team.get('id'))
  }).query(qb => {
    qb.where('code', req.params.campaign_id)
  }).fetch({
    withRelated: ['workflow'],
    transacting: req.trx
  })

  if(!campaign) return res.status(404).respond({
    code: 404,
    message: 'Unable to load campaign'
  })

  await campaign.related('workflow').save({
    steps: req.body.steps
  }, {
    patch: true,
    transacting: req.trx
  })

  res.status(200).respond(campaign.related('workflow'), WorkflowSerializer)

}

export default updateRoute
