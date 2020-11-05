import WorkflowEnrollment from '../../../../../automation/models/workflow_enrollment'
import socket from '@core/services/routes/emitter'
import SmsCampaign from '../../../../models/sms_campaign'

const destroyRoute = async (req, res) => {

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
    transacting: req.trx
  })

  await req.trx('crm_workflow_actions').where('enrollment_id', enrollment.get('id')).delete()

  await req.trx('crm_workflow_enrollments').where('id', enrollment.get('id')).delete()

  await socket.refresh(req, [
    `/admin/campaigns/sms/${sms_campaign.get('id')}`,
    `/admin/campaigns/sms/${sms_campaign.get('id')}/sessions`
  ])

  res.status(200).respond(true)

}

export default destroyRoute
