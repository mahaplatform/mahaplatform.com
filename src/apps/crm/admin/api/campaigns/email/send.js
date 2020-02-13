import SendEmailCampaignQueue from '../../../../queues/send_email_campaign_queue'
import socket from '../../../../../../core/services/routes/emitter'
import EmailCampaign from '../../../../models/email_campaign'
import moment from 'moment'

const sendRoute = async (req, res) => {

  const campaign = await EmailCampaign.scope(qb => {
    qb.where('team_id', req.team.get('id'))
  }).query(qb => {
    qb.where('id', req.params.id)
  }).fetch({
    withRelated: ['program'],
    transacting: req.trx
  })

  if(!campaign) return res.status(404).respond({
    code: 404,
    message: 'Unable to load campaign'
  })

  console.log(req.body.send_at)

  const job = await SendEmailCampaignQueue.enqueue(req, {
    id: campaign.get('id')
  }, {
    until: moment(req.body.send_at)
  })

  await campaign.save({
    send_at: req.body.send_at,
    status: 'scheduled',
    job_id: job.id
  }, {
    transacting: req.trx,
    patch: true
  })

  await socket.refresh(req, [
    '/admin/crm/campaigns',
    `/admin/crm/campaigns/email/${campaign.id}`
  ])

  res.status(200).respond(true)

}

export default sendRoute
