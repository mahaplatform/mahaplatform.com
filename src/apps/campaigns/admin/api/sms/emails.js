import EmailSerializer from '@apps/automation/serializers/email_serializer'
import Email from '@apps/automation/models/email'
import SMSCampaign from '@apps/campaigns/models/sms_campaign'

const emailsRoute = async (req, res) => {

  const campaign = await SMSCampaign.query(qb => {
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
      qb.select('automation_emails.*','automation_email_results.*')
      qb.innerJoin('automation_email_results','automation_email_results.email_id','automation_emails.id')
      qb.where('automation_emails.sms_campaign_id', campaign.get('id'))
      qb.where('automation_emails.team_id', req.team.get('id'))
      qb.whereNull('automation_emails.deleted_at')
    },
    filter: {
      params: req.query.$filter,
      allowed: ['id']
    },
    withRelated: ['event','form','program','sms_campaign'],
    transacting: req.trx
  })

  res.status(200).respond(emails, EmailSerializer)

}

export default emailsRoute
