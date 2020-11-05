import WorkflowEnrollment from '@apps/automation/models/workflow_enrollment'
import WorkflowAction from '@apps/automation/models/workflow_action'
import socket from '@core/services/routes/emitter'
import VoiceCampaign from '@apps/campaigns/models/voice_campaign'

const deleteAllRoute = async (req, res) => {

  const voice_campaign = await VoiceCampaign.query(qb => {
    qb.where('team_id', req.team.get('id'))
    qb.where('id', req.params.campaign_id)
  }).fetch({
    transacting: req.trx
  })

  if(!voice_campaign) return res.status(404).respond({
    code: 404,
    message: 'Unable to load campaign'
  })

  const ids = await WorkflowEnrollment.filterFetch({
    scope: qb => {
      qb.where('team_id', req.team.get('id'))
      qb.where('voice_campaign_id', voice_campaign.get('id'))
    },
    filter: {
      params: req.body.filter
    },
    transacting: req.trx
  }).then(results => results.map(result => {
    return result.get('id')
  }))

  const actions = await WorkflowAction.query(qb => {
    qb.whereIn('enrollment_id', ids)
  }).fetchAll({
    transacting: req.trx
  }).then(results => results.toArray())

  const action_ids = actions.map(action => action.get('id'))

  await req.trx('crm_workflow_recordings').whereIn('action_id', action_ids).delete()

  await req.trx('crm_workflow_actions').whereIn('id', action_ids).delete()

  await req.trx('crm_workflow_enrollments').whereIn('id', ids).delete()

  await socket.refresh(req, [
    `/admin/campaigns/voice/${voice_campaign.get('id')}`,
    `/admin/campaigns/voice/${voice_campaign.get('id')}/calls`
  ])

  res.status(200).respond(true)

}

export default deleteAllRoute
