import EmailCampaignSerializer from '../../../../serializers/email_campaign_serializer'
import { getRecipients } from '../../../../services/recipients'
import EmailCampaign from '../../../../models/email_campaign'

const getRecipientCount = async (req, { campaign }) => {

  if(campaign.get('status') === 'sent') {

    await campaign.load(['emails'], {
      transacting: req.trx
    })

    return campaign.related('emails').length

  }

  const contacts = await getRecipients(req, {
    type: 'email',
    purpose: campaign.get('purpose'),
    program_id: campaign.get('program_id'),
    criteria: campaign.get('to').criteria
  })

  return contacts.length

}

const showRoute = async (req, res) => {

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

  const recipient_count = await getRecipientCount(req, {
    campaign
  })

  campaign.set('recipients', recipient_count)

  res.status(200).respond(campaign, EmailCampaignSerializer)

}

export default showRoute
