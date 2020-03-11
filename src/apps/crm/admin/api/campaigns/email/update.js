import EmailCampaignSerializer from '../../../../serializers/email_campaign_serializer'
import { whitelist } from '../../../../../../core/services/routes/params'
import { audit } from '../../../../../../core/services/routes/audit'
import socket from '../../../../../../core/services/routes/emitter'
import EmailCampaign from '../../../../models/email_campaign'

const updateRoute  = async (req, res) => {

  const campaign = await EmailCampaign.query(qb => {
    qb.where('team_id', req.team.get('id'))
    qb.where('id', req.params.id)
  }).fetch({
    withRelated: ['program'],
    transacting: req.trx
  })

  if(!campaign) return res.status(404).respond({
    code: 404,
    message: 'Unable to load campaign'
  })

  await campaign.save({
    ...whitelist(req.body, ['config','to'])
  }, {
    transacting: req.trx,
    patch: true
  })

  await audit(req, {
    story: 'updated',
    auditable: campaign
  })

  await socket.refresh(req, [
    '/admin/crm/campaigns',
    `/admin/crm/campaigns/email/${campaign.id}`
  ])

  res.status(200).respond(campaign, EmailCampaignSerializer)

}

export default updateRoute
