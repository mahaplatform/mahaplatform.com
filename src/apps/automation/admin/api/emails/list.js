import EmailSerializer from '@apps/automation/serializers/email_serializer'
import Email from '@apps/automation/models/email'

const listRoute = async (req, res) => {

  const emails = await Email.filterFetch({
    scope: (qb) => {
      qb.select('automation_emails.*','automation_email_results.*')
      qb.innerJoin('automation_email_results','automation_email_results.email_id','automation_emails.id')
      qb.joinRaw('inner join crm_programs on crm_programs.id=automation_emails.program_id')
      qb.joinRaw('inner join crm_program_user_access on crm_program_user_access.program_id=automation_emails.program_id and crm_program_user_access.user_id=?', req.user.get('id'))
      qb.where('automation_emails.team_id', req.team.get('id'))
      qb.whereNull('deleted_at')
    },
    aliases: {
      program: 'crm_programs.title',
      bounce_rate: 'automation_email_results.bounce_rate',
      click_rate: 'automation_email_results.click_rate',
      open_rate: 'automation_email_results.open_rate',
      sent: 'automation_email_results.sent'
    },
    filter: {
      params: req.query.$filter,
      allowed: ['program_id']
    },
    sort: {
      params: req.query.$sort,
      defaults:  '-created_at',
      allowed: ['id','title','program','opened','clicked','bounced','unsubscribed','created_at']
    },
    page: req.query.$page,
    withRelated: ['event','form','program.logo','workflow'],
    transacting: req.trx
  })

  res.status(200).respond(emails, EmailSerializer)

}

export default listRoute
