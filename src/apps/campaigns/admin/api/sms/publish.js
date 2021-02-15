import { renderCampaign } from '@apps/campaigns/services/sms_campaigns'
import { publishVersion } from '@apps/maha/services/versions'
import SMSCampaign from '@apps/campaigns/models/sms_campaign'
import socket from '@core/services/routes/emitter'

const publishRoute = async (req, res) => {

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

  const version = await publishVersion(req, {
    versionable_type: 'crm_sms_campaigns',
    versionable_id: campaign.get('id'),
    key: 'config',
    publish_id: req.body.publish_id
  })

  await socket.refresh(req, [
    `/admin/crm_sms_campaigns/${campaign.get('id')}/config/versions`
  ])

  const config = await renderCampaign(req, {
    code: campaign.get('code'),
    config: version.get('value')
  })

  await campaign.save({
    config
  },{
    transacting: req.trx,
    patch: true
  })

  res.status(200).respond(true)

}


export default publishRoute
