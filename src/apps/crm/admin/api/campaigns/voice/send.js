import SendVoiceCampaignQueue from '../../../../queues/send_voice_campaign_queue'
import { audit } from '../../../../../../core/services/routes/audit'
import socket from '../../../../../../core/services/routes/emitter'
import VoiceCampaign from '../../../../models/voice_campaign'
import moment from 'moment'

const getSendAt = ({ strategy, date, time }) => {
  if(strategy === 'now') return moment()
  return moment(`${date} ${time}`)
}

const sendRoute = async (req, res) => {

  const voice_campaign = await VoiceCampaign.query(qb => {
    qb.where('team_id', req.team.get('id'))
    qb.where('id', req.params.id)
  }).fetch({
    transacting: req.trx
  })

  if(!voice_campaign) return res.status(404).respond({
    code: 404,
    message: 'Unable to load campaign'
  })

  const send_at = getSendAt(req.body)

  const job = await SendVoiceCampaignQueue.enqueue(req, {
    voice_campaign_id: voice_campaign.get('id')
  }, {
    until: moment(send_at)
  })

  await voice_campaign.save({
    send_at,
    status: 'scheduled',
    job_id: job.id
  }, {
    transacting: req.trx,
    patch: true
  })

  await audit(req, {
    story: 'scheduled',
    auditable: voice_campaign
  })

  await socket.refresh(req, [
    `/admin/crm/campaigns/voice/${voice_campaign.get('direction')}`,
    `/admin/crm/campaigns/voice/${voice_campaign.get('id')}`
  ])

  res.status(200).respond(true)

}

export default sendRoute
