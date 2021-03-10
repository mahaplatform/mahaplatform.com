import VoiceCampaignSerializer from '@apps/campaigns/serializers/voice_campaign_serializer'
import { getRecipients } from '@apps/campaigns/services/recipients'
import VoiceCampaign from '@apps/campaigns/models/voice_campaign'

const getRecipientCount = async (req, { campaign }) => {

  if(campaign.get('status') === 'sent') {

    await campaign.load(['enrollments'], {
      transacting: req.trx
    })

    return campaign.related('enrollments').length

  }

  if(!campaign.get('to')) return 0

  const contacts = await getRecipients(req, {
    type: 'voice',
    purpose: campaign.get('purpose'),
    program_id: campaign.get('program_id'),
    ...campaign.get('to')
  })

  return contacts.length

}

const showRoute = async (req, res) => {

  const campaign = await VoiceCampaign.query(qb => {
    qb.select('crm_voice_campaigns.*','crm_voice_campaign_results.*')
    qb.innerJoin('crm_voice_campaign_results','crm_voice_campaign_results.voice_campaign_id','crm_voice_campaigns.id')
    qb.where('team_id', req.team.get('id'))
    qb.where('id', req.params.id)
  }).fetch({
    withRelated: ['phone_number','program'],
    transacting: req.trx
  })

  if(!campaign) return res.status(404).respond({
    code: 404,
    message: 'Unable to load campaign'
  })

  if(campaign.get('direction') === 'outbound') {

    const recipient_count = await getRecipientCount(req, {
      campaign
    })

    campaign.set('recipients', recipient_count)

  }

  await res.status(200).respond(campaign, VoiceCampaignSerializer)

}

export default showRoute
