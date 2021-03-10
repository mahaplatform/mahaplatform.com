import EmailSerializer from '@apps/automation/serializers/email_serializer'
import VoiceCampaign from '@apps/campaigns/models/voice_campaign'
import Email from '@apps/automation/models/email'

const emailsRoute = async (req, res) => {

  const campaign = await VoiceCampaign.query(qb => {
    qb.where('team_id', req.team.get('id'))
    qb.where('id', req.params.id)
  }).fetch({
    transacting: req.trx
  })

  if(!campaign) return res.status(404).respond({
    code: 404,
    message: 'Unable to load campaign'
  })

  const emails = await Email.filterFetch({
    scope: (qb) => {
      qb.select('crm_emails.*','crm_email_results.*')
      qb.innerJoin('crm_email_results','crm_email_results.email_id','crm_emails.id')
      qb.where('crm_emails.voice_campaign_id', campaign.get('id'))
      qb.where('crm_emails.team_id', req.team.get('id'))
      qb.whereNull('crm_emails.deleted_at')
    },
    filter: {
      params: req.query.$filter,
      allowed: ['id']
    },
    withRelated: ['event','form','program','voice_campaign'],
    transacting: req.trx
  })

  await res.status(200).respond(emails, EmailSerializer)

}

export default emailsRoute
