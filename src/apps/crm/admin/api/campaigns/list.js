import CampaignSerializer from '../../../serializers/campaign_serializer'
import Campaign from '../../../models/campaign'

const listRoute = async (req, res) => {

  const campaigns = await Campaign.filterFetch({
    scope: (qb) => {
      qb.joinRaw('inner join crm_program_user_access on crm_program_user_access.program_id=crm_campaigns.program_id and crm_program_user_access.user_id=?', req.user.get('id'))
      qb.where('crm_campaigns.team_id', req.team.get('id'))
    },
    filter: {
      params: req.query.$filter,
      allowed: ['program_id','status','type']
    },
    sort: {
      params: req.query.sort,
      defaults:  '-created_at',
      allowed: ['created_at']
    },
    page: req.query.$page,
    withRelated: ['program'],
    transacting: req.trx
  })

  res.status(200).respond(campaigns, CampaignSerializer)

}

export default listRoute
