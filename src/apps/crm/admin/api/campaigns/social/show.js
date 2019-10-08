import SocialCampaignSerializer from '../../../../serializers/social_campaign_serializer'
import SocialCampaign from '../../../../models/social_campaign'

const showRoute = async (req, res) => {

  const campaign = await SocialCampaign.scope({
    team: req.team
  }).query(qb => {
    qb.where('code', req.params.id)
  }).fetch({
    withRelated: ['profile','program'],
    transacting: req.trx
  })

  if(!campaign) return res.status(404).respond({
    code: 404,
    message: 'Unable to load campaign'
  })

  res.status(200).respond(campaign, SocialCampaignSerializer)

}

export default showRoute
