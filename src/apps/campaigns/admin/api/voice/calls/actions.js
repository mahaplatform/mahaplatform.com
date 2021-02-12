import WorkflowActionSerializer from '@apps/automation/serializers/workflow_action_serializer'
import WorkflowEnrollment from '@apps/automation/models/workflow_enrollment'
import WorkflowAction from '@apps/automation/models/workflow_action'
import VoiceCampaign from '@apps/campaigns/models/voice_campaign'

const actionsRoute = async (req, res) => {

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

  const enrollment = await WorkflowEnrollment.query(qb => {
    qb.where('team_id', req.team.get('id'))
    qb.where('voice_campaign_id', campaign.get('id'))
    qb.where('id', req.params.id)
  }).fetch({
    withRelated: ['contact.photo','call'],
    transacting: req.trx
  })

  if(!enrollment) return res.status(404).respond({
    code: 404,
    message: 'Unable to load enrollment'
  })

  const actions = await WorkflowAction.query(qb => {
    qb.where('team_id', req.team.get('id'))
    qb.where('enrollment_id', req.params.id)
    qb.orderBy('created_at', 'asc')
  }).fetchAll({
    withRelated: ['asset','email','field','list','program','recording','topic','user','workflow','sms'],
    transacting: req.trx
  })

  res.status(200).respond(actions, WorkflowActionSerializer)

}

export default actionsRoute
