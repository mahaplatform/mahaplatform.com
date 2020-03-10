import VoiceCampaignSerializer from '../../../../serializers/voice_campaign_serializer'
import { getRecipients } from '../../../../services/recipients'
import VoiceCampaign from '../../../../models/voice_campaign'

const showRoute = async (req, res) => {

  const campaign = await VoiceCampaign.query(qb => {
    qb.select('crm_voice_campaigns.*','crm_voice_campaign_results.*')
    qb.innerJoin('crm_voice_campaign_results','crm_voice_campaign_results.voice_campaign_id','crm_voice_campaigns.id')
    qb.where('team_id', req.team.get('id'))
    qb.where('id', req.params.id)
  }).fetch({
    withRelated: ['phone_number','program','steps'],
    transacting: req.trx
  })

  if(!campaign) return res.status(404).respond({
    code: 404,
    message: 'Unable to load campaign'
  })

  const contacts = await getRecipients(req, {
    type: 'voice',
    purpose: campaign.get('purpose'),
    criteria: campaign.get('to').criteria
  })

  campaign.set('recipients', contacts.length)

  res.status(200).respond(campaign, VoiceCampaignSerializer)

}

export default showRoute
