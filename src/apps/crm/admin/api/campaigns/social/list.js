import SocialCampaignSerializer from '../../../../serializers/social_campaign_serializer'
import SocialCampaign from '../../../../models/social_campaign'

const listRoute = async (req, res) => {

  const social_campaigns = await SocialCampaign.filterFetch({
    scope: (qb) => {
      qb.select('crm_social_campaigns.*','crm_social_campaign_results.*')
      qb.innerJoin('crm_social_campaign_results','crm_social_campaign_results.social_campaign_id','crm_social_campaigns.id')
      qb.joinRaw('inner join crm_programs on crm_programs.id=crm_social_campaigns.program_id')
      qb.joinRaw('inner join crm_program_user_access on crm_program_user_access.program_id=crm_social_campaigns.program_id and crm_program_user_access.user_id=?', req.user.get('id'))
      qb.where('crm_social_campaigns.team_id', req.team.get('id'))
      qb.whereNull('crm_social_campaigns.deleted_at')
    },
    aliases: {
      program: 'crm_programs.title'
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

  res.status(200).respond(social_campaigns, SocialCampaignSerializer)

}

export default listRoute
