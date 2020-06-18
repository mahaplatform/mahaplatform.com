import SendSmsCampaignQueue from '../../../../queues/send_sms_campaign_queue'
import { audit } from '../../../../../../core/services/routes/audit'
import socket from '../../../../../../core/services/routes/emitter'
import SmsCampaign from '../../../../models/sms_campaign'

const unscheduleRoute = async (req, res) => {

  const campaign = await SmsCampaign.query(qb => {
    qb.where('team_id', req.team.get('id'))
    qb.where('id', req.params.id)
  }).fetch({
    transacting: req.trx
  })

  if(!campaign) return res.status(404).respond({
    code: 404,
    message: 'Unable to load campaign'
  })

  if(!campaign.get('job_id')) return res.status(422).respond({
    code: 422,
    message: 'Campaign is not scheduled'
  })

  const job = await SendSmsCampaignQueue.queue.getJob(campaign.get('job_id'))

  await job.remove()

  await campaign.save({
    send_at: null,
    status: 'draft',
    job_id: null
  }, {
    transacting: req.trx,
    patch: true
  })

  await audit(req, {
    story: 'unscheduled',
    auditable: campaign
  })

  await socket.refresh(req, [
    '/admin/crm/campaigns/sms',
    `/admin/crm/campaigns/sms/${campaign.id}`
  ])

  res.status(200).respond(true)

}

export default unscheduleRoute
