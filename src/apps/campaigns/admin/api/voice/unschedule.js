import SendVoiceCampaignQueue from '@apps/campaigns/queues/send_voice_campaign_queue'
import { audit } from '@core/services/routes/audit'
import socket from '@core/services/routes/emitter'
import VoiceCampaign from '@apps/campaigns/models/voice_campaign'

const unscheduleRoute = async (req, res) => {

  const campaign = await VoiceCampaign.query(qb => {
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

  const job = await SendVoiceCampaignQueue.queue.getJob(campaign.get('job_id'))

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
    '/admin/campaigns/voice',
    `/admin/campaigns/voice/${campaign.id}`
  ])

  res.status(200).respond(true)

}

export default unscheduleRoute
