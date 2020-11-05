import SendSMSCampaignQueue from '@apps/campaigns/queues/send_sms_campaign_queue'
import { audit } from '@core/services/routes/audit'
import socket from '@core/services/routes/emitter'
import SMSCampaign from '@apps/campaigns/models/sms_campaign'
import moment from 'moment'

const getSendAt = ({ strategy, date, time }) => {
  if(strategy === 'now') return moment()
  return moment(`${date} ${time}`)
}

const resendRoute = async (req, res) => {

  const campaign = await SMSCampaign.query(qb => {
    qb.where('team_id', req.team.get('id'))
    qb.where('id', req.params.id)
  }).fetch({
    transacting: req.trx
  })

  if(!campaign) return res.status(404).respond({
    code: 404,
    message: 'Unable to load campaign'
  })

  const send_at = getSendAt(req.body)

  await SendSMSCampaignQueue.enqueue(req, {
    sms_campaign_id: campaign.get('id'),
    resend_to: req.body.to
  }, {
    until: moment(send_at)
  })

  await audit(req, {
    story: 'resent',
    auditable: campaign
  })

  await socket.refresh(req, [
    '/admin/campaigns/sms',
    `/admin/campaigns/sms/${campaign.id}`
  ])

  res.status(200).respond(true)

}

export default resendRoute
