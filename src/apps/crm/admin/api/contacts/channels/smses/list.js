import PhoneNumber from '../../../../../models/phone_number'
import SMS from '../../../../../../maha/models/sms'
import Contact from '../../../../../models/contact'
import Program from '../../../../../models/program'

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

  const program = await Program.query(qb => {
    qb.where('team_id', req.team.get('id'))
    qb.where('id', req.params.program_id)
  }).fetch({
    withRelated: ['logo','phone_number'],
    transacting: req.trx
  })

  const phone = await PhoneNumber.query(qb => {
    qb.where('team_id', req.team.get('id'))
    qb.where('contact_id', contact.get('id'))
    qb.where('id', req.params.id)
  }).fetch({
    transacting: req.trx
  })

  const contact_number = phone.get('number')

  const program_number = program.related('phone_number').get('number')

  if(!program_number) return res.status(200).respond(null)

  const smses = await SMS.filterFetch({
    scope: (qb) => {
      qb.joinRaw('inner join maha_numbers to_numbers on to_numbers.id=maha_smses.to_id')
      qb.joinRaw('inner join maha_numbers from_numbers on from_numbers.id=maha_smses.from_id')
      qb.whereRaw('((to_numbers.number=? and from_numbers.number=?) or (to_numbers.number=? and from_numbers.number=?))', [contact_number, program_number, program_number, contact_number])
      qb.where('team_id', req.team.get('id'))
    },
    sort: {
      params: req.query.$sort,
      defaults: '-created_at',
      allowed: ['created_at']
    },
    page: req.query.$page,
    withRelated: ['to','from','attachments.asset'],
    transacting: req.trx
  })

  res.status(200).respond(smses, (req, sms) => ({
    id: sms.get('id'),
    contact: sms.related('from').get('number') === contact_number ? {
      id: contact.get('id'),
      display_name: contact.get('display_name'),
      initials: contact.get('initials'),
      rfc822: contact.get('rfc822'),
      email: contact.get('email'),
      photo: contact.related('photo') ? contact.related('photo').get('path') : null
    } : null,
    program: sms.related('from').get('number') === program_number ? {
      id: program.get('id'),
      title: program.get('title'),
      logo: program.related('logo') ? program.related('logo').get('path') : null
    } : null,
    attachments: sms.related('attachments').map(attachment => ({
      id: attachment.get('id'),
      asset: {
        id: attachment.related('asset').get('id'),
        original_file_name: attachment.related('asset').get('original_file_name'),
        file_name: attachment.related('asset').get('file_name'),
        content_type: attachment.related('asset').get('content_type'),
        file_size: attachment.related('asset').get('file_size'),
        status: attachment.related('asset').get('status'),
        has_preview: attachment.related('asset').get('has_preview'),
        is_infected: attachment.related('asset').get('is_infected'),
        path: attachment.related('asset').get('path'),
        signed_url: attachment.related('asset').get('signed_url'),
        source: attachment.related('asset').related('source').get('text'),
        source_url: attachment.related('asset').get('source_url'),
        created_at: attachment.related('asset').get('created_at'),
        updated_at: attachment.related('asset').get('updated_at')
      }
    })),
    body: sms.get('body'),
    created_at: sms.get('created_at'),
    updated_at: sms.get('updated_at')

  }))

}

export default listRoute
