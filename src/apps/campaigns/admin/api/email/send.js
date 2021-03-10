import SendEmailCampaignQueue from '@apps/campaigns/queues/send_email_campaign_queue'
import { audit } from '@core/services/routes/audit'
import socket from '@core/services/routes/emitter'
import EmailCampaign from '@apps/campaigns/models/email_campaign'
import moment from 'moment'

const getSendAt = ({ strategy, date, time }) => {
  if(strategy === 'now') return moment().add(10, 'seconds')
  return moment(`${date} ${time}`)
}

const sendRoute = async (req, res) => {

  const campaign = await EmailCampaign.query(qb => {
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

  const job = await SendEmailCampaignQueue.enqueue(req, {
    email_campaign_id: campaign.get('id')
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
    '/admin/campaigns/email',
    `/admin/campaigns/email/${campaign.id}`
  ])

  await res.status(200).respond(true)

}

export default sendRoute
