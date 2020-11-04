import { personalizeEmail } from '../../../../../../automation/services/email'
import Email from '../../../../../../maha/models/email'
import Contact from '../../../../../models/contact'
import parser from 'address-rfc2822'

const listRoute = async (req, res) => {

  const contact = await Contact.query(qb => {
    qb.where('team_id', req.team.get('id'))
    qb.where('id', req.params.contact_id)
  }).fetch({
    withRelated: ['photo'],
    transacting: req.trx
  })

  if(!contact) return res.status(404).respond({
    code: 404,
    message: 'Unable to load contact'
  })

  const emails = await Email.filterFetch({
    scope: (qb) => {
      qb.leftJoin('crm_email_campaigns', 'crm_email_campaigns.id','maha_emails.email_campaign_id')
      qb.leftJoin('crm_emails', 'crm_emails.id','maha_emails.email_id')
      qb.whereRaw('(crm_email_campaigns.program_id=? or crm_emails.program_id=?)', [req.params.program_id, req.params.program_id])
      qb.where('maha_emails.email_address_id', req.params.id)
      qb.where('maha_emails.team_id', req.team.get('id'))
    },
    sort: {
      params: req.query.$sort,
      defaults: '-created_at',
      allowed: ['created_at']
    },
    withRelated: ['email_campaign'],
    page: req.query.$page,
    transacting: req.trx
  })

  res.status(200).respond(emails, (req, email) => {

    if(email.get('email_campaign_id')) {
      const campaign = email.related('email_campaign')
      const personalized = personalizeEmail(req, {
        subject: campaign.get('config').settings.subject,
        html: campaign.get('html'),
        data: email.get('data')
      })
      email.set('subject', personalized.subject)
      email.set('html', personalized.html)
    }

    const from = parser.parse(email.get('from').replace(',', ''))

    return {
      id: email.get('id'),
      code: email.get('code'),
      from: from[0].phrase,
      subject: email.get('subject'),
      sent_at: email.get('sent_at'),
      was_opened: email.get('was_opened'),
      created_at: email.get('created_at'),
      updated_at: email.get('updated_at')
    }

  })

}

export default listRoute
