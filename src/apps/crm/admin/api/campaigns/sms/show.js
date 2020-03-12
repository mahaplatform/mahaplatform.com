import SMSCampaignSerializer from '../../../../serializers/sms_campaign_serializer'
import { getRecipients } from '../../../../services/recipients'
import SMSCampaign from '../../../../models/sms_campaign'

const showRoute = async (req, res) => {

  const campaign = await SMSCampaign.query(qb => {
    qb.select('crm_sms_campaigns.*','crm_sms_campaign_results.*')
    qb.innerJoin('crm_sms_campaign_results','crm_sms_campaign_results.sms_campaign_id','crm_sms_campaigns.id')
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
    type: 'sms',
    purpose: campaign.get('purpose'),
    program_id: campaign.get('program_id'),
    criteria: campaign.get('to').criteria
  })

  campaign.set('recipients', contacts.length)

  res.status(200).respond(campaign, SMSCampaignSerializer)

}

export default showRoute
