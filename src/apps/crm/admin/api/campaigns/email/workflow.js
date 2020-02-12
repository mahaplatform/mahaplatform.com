import WorkflowSerializer from '../../../../serializers/workflow_serializer'
import EmailCampaign from '../../../../models/email_campaign'

const workflowRoute = async (req, res) => {

  const campaign = await EmailCampaign.scope(qb => {
    qb.where('team_id', req.team.get('id'))
  }).query(qb => {
    qb.where('id', req.params.id)
  }).fetch({
    withRelated: ['workflow.program'],
    transacting: req.trx
  })

  if(!campaign) return res.status(404).respond({
    code: 404,
    message: 'Unable to load campaign'
  })

  res.status(200).respond(campaign.related('workflow'), WorkflowSerializer)

}

export default workflowRoute
