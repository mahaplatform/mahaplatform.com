import SmsCampaignSerializer from '@apps/campaigns/serializers/sms_campaign_serializer'
import SmsCampaign from '@apps/campaigns/models/sms_campaign'

const outboundRoute = async (req, res) => {

  const sms_campaigns = await SmsCampaign.filterFetch({
    scope: (qb) => {
      qb.select('crm_sms_campaigns.*','crm_sms_campaign_results.*')
      qb.innerJoin('crm_sms_campaign_results','crm_sms_campaign_results.sms_campaign_id','crm_sms_campaigns.id')
      qb.joinRaw('inner join crm_programs on crm_programs.id=crm_sms_campaigns.program_id')
      qb.joinRaw('inner join crm_program_user_access on crm_program_user_access.program_id=crm_sms_campaigns.program_id and crm_program_user_access.user_id=?', req.user.get('id'))
      qb.where('crm_sms_campaigns.team_id', req.team.get('id'))
      qb.where('crm_sms_campaigns.direction', 'outbound')
      qb.whereNull('crm_sms_campaigns.deleted_at')
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
    withRelated: ['program.logo','program.phone_number'],
    transacting: req.trx
  })

  await res.status(200).respond(sms_campaigns, SmsCampaignSerializer)

}

export default outboundRoute
