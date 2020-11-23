import PhoneNumber from '@apps/crm/models/phone_number'
import SMS from '@apps/maha/models/sms'
import Program from '@apps/crm/models/program'

const smsesRoute = async (req, res) => {

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

  const phone = await PhoneNumber.query(qb => {
    qb.where('team_id', req.team.get('id'))
    qb.where('id', req.params.id)
  }).fetch({
    withRelated: ['contact'],
    transacting: req.trx
  })

  const contact = phone.related('contact')

  const smses = await SMS.filterFetch({
    scope: (qb) => {
      qb.where('program_id', req.params.program_id)
      qb.where('phone_number_id', req.params.id)
      qb.where('team_id', req.team.get('id'))
    },
    sort: {
      params: req.query.$sort,
      defaults: '-created_at',
      allowed: ['created_at']
    },
    page: req.query.$page,
    withRelated: ['to','from','attachments.asset','user.photo'],
    transacting: req.trx
  })

  res.status(200).respond(smses, (req, sms) => ({
    id: sms.get('id'),
    contact: sms.related('from').get('number') === phone.get('number') ? {
      id: contact.get('id'),
      display_name: contact.get('display_name'),
      initials: contact.get('initials'),
      rfc822: contact.get('rfc822'),
      email: contact.get('email'),
      photo: contact.related('photo') ? contact.related('photo').get('path') : null
    } : null,
    program: sms.related('to').get('number') === phone.get('number') ? {
      id: program.get('id'),
      title: program.get('title'),
      logo: program.related('logo') ? program.related('logo').get('path') : null
    } : null,
    user: sms.get('user_id') ? {
      id: sms.related('user').get('id'),
      full_name: sms.related('user').get('full_name'),
      initials: sms.related('user').get('initials'),
      photo: sms.related('user').related('photo') ? sms.related('user').related('photo').get('path') : null
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
        source: attachment.related('asset').get('source'),
        source_url: attachment.related('asset').get('source_url'),
        created_at: attachment.related('asset').get('created_at'),
        updated_at: attachment.related('asset').get('updated_at')
      }
    })),
    body: sms.get('body'),
    status: sms.get('status'),
    created_at: sms.get('created_at'),
    updated_at: sms.get('updated_at')

  }))

}

export default smsesRoute
