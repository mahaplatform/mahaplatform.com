import EmailSerializer from '../../../serializers/email_serializer'
import Email from '../../../models/email'

const listRoute = async (req, res) => {

  const emails = await Email.filterFetch({
    scope: (qb) => {
      qb.select('crm_emails.*','crm_email_results.*')
      qb.innerJoin('crm_email_results','crm_email_results.email_id','crm_emails.id')
      qb.joinRaw('inner join crm_programs on crm_programs.id=crm_emails.program_id')
      qb.joinRaw('inner join crm_program_user_access on crm_program_user_access.program_id=crm_emails.program_id and crm_program_user_access.user_id=?', req.user.get('id'))
      qb.where('crm_emails.team_id', req.team.get('id'))
    },
    aliases: {
      program: 'crm_programs.title',
      opened: 'crm_email_results.opened',
      clicked: 'crm_email_results.clicked',
      bounced: 'crm_email_results.bounced',
      unsubscribed: 'crm_email_results.unsubscribed'
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
    withRelated: ['form','program'],
    transacting: req.trx
  })

  res.status(200).respond(emails, EmailSerializer)

}

export default listRoute
