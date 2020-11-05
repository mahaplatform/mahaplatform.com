import WorkflowSerializer from '@apps/automation/serializers/workflow_serializer'
import EmailCampaign from '../../../models/email_campaign'

const workflowsRoute = async (req, res) => {

  const campaign = await EmailCampaign.query(qb => {
    qb.where('team_id', req.team.get('id'))
    qb.where('id', req.params.id)
  }).fetch({
    withRelated: ['workflows.program'],
    transacting: req.trx
  })

  if(!campaign) return res.status(404).respond({
    code: 404,
    message: 'Unable to load campaign'
  })

  res.status(200).respond(campaign.related('workflows'), WorkflowSerializer)

}

export default workflowsRoute
