import EmailCampaignSerializer from '../../../../serializers/email_campaign_serializer'
import { whitelist } from '../../../../../../core/services/routes/params'
import { audit } from '../../../../../../core/services/routes/audit'
import socket from '../../../../../../core/services/routes/emitter'
import EmailCampaign from '../../../../models/email_campaign'

const updateRoute  = async (req, res) => {

  const email_campaign = await EmailCampaign.query(qb => {
    qb.where('team_id', req.team.get('id'))
    qb.where('id', req.params.id)
  }).fetch({
    withRelated: ['program'],
    transacting: req.trx
  })

  if(!email_campaign) return res.status(404).respond({
    code: 404,
    message: 'Unable to load campaign'
  })

  await email_campaign.save({
    ...whitelist(req.body, ['config','to'])
  }, {
    transacting: req.trx,
    patch: true
  })

  await audit(req, {
    story: 'updated',
    auditable: email_campaign
  })

  await socket.refresh(req, [
    '/admin/crm/campaigns/email',
    `/admin/crm/campaigns/email/${email_campaign.id}`
  ])

  res.status(200).respond(email_campaign, EmailCampaignSerializer)

}

export default updateRoute
