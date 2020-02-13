import EmailCampaignSerializer from '../../../../serializers/email_campaign_serializer'
import { getRecipients } from '../../../../services/email_campaigns'
import EmailCampaign from '../../../../models/email_campaign'

const showRoute = async (req, res) => {

  const campaign = await EmailCampaign.scope(qb => {
    qb.where('team_id', req.team.get('id'))
  }).query(qb => {
    qb.where('id', req.params.id)
  }).fetch({
    withRelated: ['program'],
    transacting: req.trx
  })

  if(!campaign) return res.status(404).respond({
    code: 404,
    message: 'Unable to load campaign'
  })

  const contacts = await getRecipients(req, {
    to: campaign.get('to')
  })

  campaign.set('recipients', contacts.length)

  res.status(200).respond(campaign, EmailCampaignSerializer)

}

export default showRoute
