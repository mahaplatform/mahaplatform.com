import SendVoiceCampaignQueue from '@apps/campaigns/queues/send_voice_campaign_queue'
import { audit } from '@core/services/routes/audit'
import socket from '@core/services/routes/emitter'
import VoiceCampaign from '@apps/campaigns/models/voice_campaign'
import moment from 'moment'

const getSendAt = ({ strategy, date, time }) => {
  if(strategy === 'now') return moment()
  return moment(`${date} ${time}`)
}

const sendRoute = async (req, res) => {

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

  await campaign.save({
    to: req.body.to
  }, {
    transacting: req.trx,
    patch: true
  })

  const send_at = getSendAt(req.body)

  const job = await SendVoiceCampaignQueue.enqueue(req, {
    voice_campaign_id: campaign.get('id')
  }, {
    until: moment(send_at)
  })

  await campaign.save({
    send_at,
    status: 'scheduled',
    job_id: job.id
  }, {
    transacting: req.trx,
    patch: true
  })

  await audit(req, {
    story: 'scheduled',
    auditable: campaign
  })

  await socket.refresh(req, [
    `/admin/campaigns/voice/${campaign.get('direction')}`,
    `/admin/campaigns/voice/${campaign.get('id')}`
  ])

  await res.status(200).respond(true)

}

export default sendRoute
