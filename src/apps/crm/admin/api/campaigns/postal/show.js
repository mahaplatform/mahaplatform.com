import PostalCampaignSerializer from '../../../../serializers/postal_campaign_serializer'
import PostalCampaign from '../../../../models/postal_campaign'

const showRoute = async (req, res) => {

  const campaign = await PostalCampaign.scope({
    team: req.team
  }).query(qb => {
    qb.where('code', req.params.id)
  }).fetch({
    withRelated: ['program'],
    transacting: req.trx
  })

  if(!campaign) return res.status(404).respond({
    code: 404,
    message: 'Unable to load campaign'
  })

  res.status(200).respond(campaign, PostalCampaignSerializer)

}

export default showRoute
