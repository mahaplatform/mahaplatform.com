import SMSCampaignSerializer from '../../../../serializers/sms_campaign_serializer'
import { getRecipients } from '../../../../services/recipients'
import SMSCampaign from '../../../../models/sms_campaign'

const getRecipientCount = async (req, { campaign }) => {

  if(campaign.get('status') === 'sent') {

    await campaign.load(['enrollments'], {
      transacting: req.trx
    })

    return campaign.related('enrollments').length

  }

  const recipients = await getRecipients(req, {
    type: 'sms',
    purpose: campaign.get('purpose'),
    program_id: campaign.get('program_id'),
    ...campaign.get('to')
  })

  return recipients.length

}

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

  if(campaign.get('direction') === 'outbound') {

    const recipient_count = await getRecipientCount(req, {
      campaign
    })

    campaign.set('recipients', recipient_count)

  }

  res.status(200).respond(campaign, SMSCampaignSerializer)

}

export default showRoute
