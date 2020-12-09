import Email from '@apps/maha/models/email'
import Program from '@apps/crm/models/program'

const listRoute = async (req, res) => {

  const program = await Program.query(qb => {
    qb.select(req.trx.raw('crm_programs.*,crm_program_user_access.type as access_type'))
    qb.joinRaw('inner join crm_program_user_access on crm_program_user_access.program_id=crm_programs.id and crm_program_user_access.user_id=?', req.user.get('id'))
    qb.where('crm_programs.team_id', req.team.get('id'))
    qb.where('id', req.params.program_id)
  }).fetch({
    transacting: req.trx
  })

  if(!program) return res.status(404).respond({
    code: 404,
    message: 'Unable to load program'
  })

  const smses = await Email.filterFetch({
    scope: (qb) => {
      qb.select(req.trx.raw('distinct on (campaigns_email_campaigns.program_id,automation_emails.program_id,email_address_id) maha_emails.*'))
      qb.leftJoin('campaigns_email_campaigns', 'campaigns_email_campaigns.id','maha_emails.email_campaign_id')
      qb.leftJoin('automation_emails', 'automation_emails.id','maha_emails.email_id')
      qb.whereRaw('(campaigns_email_campaigns.program_id=? or automation_emails.program_id=?)', [program.get('id'), program.get('id')])
      qb.orderByRaw('campaigns_email_campaigns.program_id,automation_emails.program_id,email_address_id,created_at desc')
    },
    sort: {
      params: req.query.$sort,
      defaults: '-created_at',
      allowed: ['created_at']
    },
    page: req.query.$page,
    withRelated: ['email_address.contact'],
    transacting: req.trx
  })

  res.status(200).respond(smses, (req, sms) => {
    const email_address = sms.related('email_address')
    const contact = email_address.related('contact')
    return {
      id: sms.get('id'),
      email_address: {
        id: email_address.get('id'),
        number: email_address.get('number')
      },
      contact: {
        id: contact.get('id'),
        display_name: contact.get('display_name'),
        initials: contact.get('initials'),
        rfc822: contact.get('rfc822'),
        email: contact.get('email'),
        photo: contact.related('photo') ? contact.related('photo').get('path') : null
      }
    }
  })

}

export default listRoute
