import CampaignSerializer from '../../../serializers/campaign_serializer'
import Campaign from '../../../models/campaign'

const listRoute = async (req, res) => {

  const campaigns = await Campaign.scope(qb => {
    qb.where('team_id', req.team.get('id'))
  }).filter({
    filter: req.query.$filter,
    filterParams: ['program_id']
  }).sort({
    defaultSort:  '-created_at',
    sortParams: ['created_at']
  }).fetchPage({
    page: req.query.$page,
    withRelated: ['program'],
    transacting: req.trx
  })

  res.status(200).respond(campaigns, CampaignSerializer)

}

export default listRoute
