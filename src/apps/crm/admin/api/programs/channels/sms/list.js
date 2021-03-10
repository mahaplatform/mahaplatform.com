import SMSReceipt from '@apps/crm/models/sms_receipt'
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

  const smses = await SMSReceipt.filterFetch({
    scope: (qb) => {
      qb.innerJoin('crm_phone_numbers', 'crm_phone_numbers.id','crm_sms_receipts.phone_number_id')
      qb.innerJoin('crm_contacts', 'crm_contacts.id','crm_sms_receipts.contact_id')
      qb.where('crm_sms_receipts.program_id', program.get('id'))
      qb.orderByRaw('crm_sms_receipts.last_message_at desc')
    },
    aliases: {
      first_name: 'crm_contacts.first_name',
      last_name: 'crm_contacts.last_name'
    },
    filter: {
      params: req.query.$filter,
      search: ['first_name','last_name']
    },
    sort: {
      params: req.query.$sort,
      defaults: '-last_message_at',
      allowed: ['last_message_at']
    },
    page: req.query.$page,
    withRelated: ['contact.photo','phone_number'],
    transacting: req.trx
  })

  await res.status(200).respond(smses, (req, sms) => {
    const phone_number = sms.related('phone_number')
    const contact = sms.related('contact')
    return {
      id: contact.get('id'),
      phone_number: {
        id: phone_number.get('id'),
        number: phone_number.get('number'),
        formatted: phone_number.get('formatted')
      },
      contact: {
        id: contact.get('id'),
        display_name: contact.get('display_name'),
        initials: contact.get('initials'),
        rfc822: contact.get('rfc822'),
        email: contact.get('email'),
        photo: contact.related('photo') ? contact.related('photo').get('path') : null
      },
      last_message: sms.get('last_message'),
      unread: sms.get('unread')
    }
  })

}

export default listRoute
