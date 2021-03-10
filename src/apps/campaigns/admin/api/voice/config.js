import { renderCampaign } from '@apps/maha/services/phone_numbers'
import VoiceCampaign from '@apps/campaigns/models/voice_campaign'
import { updateVersion } from '@apps/maha/services/versions'
import { upload } from '@core/services/aws/s3'

const configRoute = async (req, res) => {

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

  const version = await updateVersion(req, {
    versionable_type: 'crm_voice_campaigns',
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
    key: `twiml/voice/outbound/${campaign.get('code')}`,
    cache_control: 'max-age=0,no-cache',
    content_type: 'application/json',
    file_data: JSON.stringify(rendered)
  })

  await res.status(200).respond(true)

}

export default configRoute
