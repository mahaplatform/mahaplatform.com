import EmailCampaignSerializer from '@apps/campaigns/serializers/email_campaign_serializer'
import EmailCampaign from '@apps/campaigns/models/email_campaign'

const listRoute = async (req, res) => {

  const email_campaigns = await EmailCampaign.filterFetch({
    scope: (qb) => {
      qb.select('crm_email_campaigns.*','crm_email_campaign_results.*')
      qb.innerJoin('crm_email_campaign_results','crm_email_campaign_results.email_campaign_id','crm_email_campaigns.id')
      qb.joinRaw('inner join crm_programs on crm_programs.id=crm_email_campaigns.program_id')
      qb.joinRaw('inner join crm_program_user_access on crm_program_user_access.program_id=crm_email_campaigns.program_id and crm_program_user_access.user_id=?', req.user.get('id'))
      qb.where('crm_email_campaigns.team_id', req.team.get('id'))
      qb.whereNull('crm_email_campaigns.deleted_at')
    },
    aliases: {
      program: 'crm_programs.title',
      bounce_rate: 'crm_email_campaign_results.bounce_rate',
      click_rate: 'crm_email_campaign_results.click_rate',
      open_rate: 'crm_email_campaign_results.open_rate',
      sent: 'crm_email_campaign_results.sent'
    },
    filter: {
      params: req.query.$filter,
      allowed: ['program_id','status']
    },
    sort: {
      params: req.query.$sort,
      defaults:  '-created_at',
      allowed: ['id','title','program','direction','status','created_at']
    },
    page: req.query.$page,
    withRelated: ['program.logo'],
    transacting: req.trx
  })

  await res.status(200).respond(email_campaigns, EmailCampaignSerializer)

}

export default listRoute
