import VoiceCampaignSerializer from '@apps/campaigns/serializers/voice_campaign_serializer'
import VoiceCampaign from '@apps/campaigns/models/voice_campaign'

const outboundRoute = async (req, res) => {

  const voice_campaigns = await VoiceCampaign.filterFetch({
    scope: (qb) => {
      qb.select('campaigns_voice_campaigns.*','campaigns_voice_campaign_results.*')
      qb.innerJoin('campaigns_voice_campaign_results','campaigns_voice_campaign_results.voice_campaign_id','campaigns_voice_campaigns.id')
      qb.joinRaw('inner join crm_programs on crm_programs.id=campaigns_voice_campaigns.program_id')
      qb.joinRaw('inner join crm_program_user_access on crm_program_user_access.program_id=campaigns_voice_campaigns.program_id and crm_program_user_access.user_id=?', req.user.get('id'))
      qb.where('campaigns_voice_campaigns.team_id', req.team.get('id'))
      qb.where('campaigns_voice_campaigns.direction', 'outbound')
      qb.whereNull('campaigns_voice_campaigns.deleted_at')
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
      allowed: ['id','title','program','status','created_at']
    },
    page: req.query.$page,
    withRelated: ['program.logo','program.phone_number'],
    transacting: req.trx
  })

  res.status(200).respond(voice_campaigns, VoiceCampaignSerializer)

}

export default outboundRoute
