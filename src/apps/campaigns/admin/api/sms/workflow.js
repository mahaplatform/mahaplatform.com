import { renderCampaign } from '@apps/campaigns/services/sms_campaigns'
import SMSCampaign from '@apps/campaigns/models/sms_campaign'
import { updateVersion } from '@apps/maha/services/versions'
import { upload } from '@core/services/aws/s3'

const getKey = (campaign) => {
  if(campaign.get('direction') === 'outbound') {
    return `outbound/${campaign.get('code')}`
  } else {
    return `inbound/${campaign.related('phone_number').get('number').substr(1)}/${campaign.get('term')}`
  }
}

const updateRoute = async (req, res) => {

  const campaign = await SMSCampaign.query(qb => {
    qb.where('team_id', req.team.get('id'))
    qb.where('id', req.params.id)
  }).fetch({
    withRelated: ['phone_number'],
    transacting: req.trx
  })

  if(!campaign) return res.status(404).respond({
    code: 404,
    message: 'Unable to load campaign'
  })

  const version = await updateVersion(req, {
    versionable_type: 'crm_sms_campaigns',
    versionable_id: campaign.get('id'),
    key: 'config',
    value: req.body
  })

  const rendered = await renderCampaign(req, {
    code: campaign.get('code'),
    config: version.get('value')
  })

  await upload(null, {
    acl: 'private',
    bucket: process.env.AWS_BUCKET,
    key: `twiml/sms/${getKey(campaign)}`,
    cache_control: 'max-age=0,no-cache',
    content_type: 'application/json',
    file_data: JSON.stringify(rendered)
  })

  res.status(200).respond(true)

}

export default updateRoute
