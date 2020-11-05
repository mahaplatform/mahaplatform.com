import WorkflowEnrollment from '@apps/automation/models/workflow_enrollment'
import socket from '@core/services/routes/emitter'
import SmsCampaign from '@apps/campaigns/models/sms_campaign'

const deleteAllRoute = async (req, res) => {

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

  const ids = await WorkflowEnrollment.filterFetch({
    scope: qb => {
      qb.where('team_id', req.team.get('id'))
      qb.where('sms_campaign_id', sms_campaign.get('id'))
    },
    filter: {
      params: req.body.filter
    },
    transacting: req.trx
  }).then(results => results.map(result => {
    return result.get('id')
  }))

  await req.trx('crm_workflow_actions').whereIn('enrollment_id', ids).delete()

  await req.trx('crm_workflow_enrollments').whereIn('id', ids).delete()

  await socket.refresh(req, [
    `/admin/campaigns/sms/${sms_campaign.get('id')}`,
    `/admin/campaigns/sms/${sms_campaign.get('id')}/sessions`
  ])

  res.status(200).respond(true)

}

export default deleteAllRoute
