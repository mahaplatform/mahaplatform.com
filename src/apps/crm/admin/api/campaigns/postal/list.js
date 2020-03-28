import PostalCampaignSerializer from '../../../../serializers/postal_campaign_serializer'
import PostalCampaign from '../../../../models/postal_campaign'

const listRoute = async (req, res) => {

  const postal_campaigns = await PostalCampaign.filterFetch({
    scope: (qb) => {
      qb.select('crm_postal_campaigns.*','crm_postal_campaign_results.*')
      qb.innerJoin('crm_postal_campaign_results','crm_postal_campaign_results.postal_campaign_id','crm_postal_campaigns.id')
      qb.joinRaw('inner join crm_programs on crm_programs.id=crm_postal_campaigns.program_id')
      qb.joinRaw('inner join crm_program_user_access on crm_program_user_access.program_id=crm_postal_campaigns.program_id and crm_program_user_access.user_id=?', req.user.get('id'))
      qb.where('crm_postal_campaigns.team_id', req.team.get('id'))
      qb.whereNull('crm_postal_campaigns.deleted_at')
    },
    aliases: {
      program: 'program.title'
    },
    filter: {
      params: req.query.$filter,
      allowed: ['program_id','status']
    },
    sort: {
      params: req.query.sort,
      defaults:  '-created_at',
      allowed: ['id','title','program','direction','status','created_at']
    },
    page: req.query.$page,
    withRelated: ['program'],
    transacting: req.trx
  })

  res.status(200).respond(postal_campaigns, PostalCampaignSerializer)

}

export default listRoute
