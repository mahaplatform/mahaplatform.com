import CampaignSerializer from '../../../serializers/campaign_serializer'
import Campaign from '../../../models/campaign'

const listRoute = async (req, res) => {

  const campaigns = await Campaign.scope({
    team: req.team
  }).filter({
    filter: req.query.$filter,
    filterParams: ['program_id']
  }).fetchPage({
    page: req.query.$page,
    withRelated: ['program'],
    transacting: req.trx
  })

  res.status(200).respond(campaigns, CampaignSerializer)

}

export default listRoute
