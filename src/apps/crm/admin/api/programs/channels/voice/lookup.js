import PhoneNumber from '../../../../../models/phone_number'
import Program from '../../../../../models/program'
import Channel from '../../../../../models/channel'

const lookupRoute = async (req, res) => {

  const program = await Program.query(qb => {
    qb.select(req.trx.raw('crm_programs.*,crm_program_user_access.type as access_type'))
    qb.joinRaw('inner join crm_program_user_access on crm_program_user_access.program_id=crm_programs.id and crm_program_user_access.user_id=?', req.user.get('id'))
    qb.where('crm_programs.team_id', req.team.get('id'))
    qb.where('id', req.params.program_id)
  }).fetch({
    withRelated: ['phone_number'],
    transacting: req.trx
  })

  if(!program) return res.status(404).respond({
    code: 404,
    message: 'Unable to load program'
  })

  const phone_number = await PhoneNumber.query(qb => {
    qb.where('team_id', req.team.get('id'))
    qb.where('number', req.query.number)
  }).fetch({
    transacting: req.trx
  })

  if(!program) return res.status(404).respond({
    code: 404,
    message: 'Unable to load contact'
  })

  const channel = await Channel.query(qb => {
    qb.where('team_id', req.team.get('id'))
    qb.where('program_id', program.get('id'))
    qb.where('phone_number_id', phone_number.get('id'))
    qb.where('type', 'voice')
  }).fetch({
    withRelated: ['contact'],
    transacting: req.trx
  })

  res.status(200).respond(channel, (req, channel) => {
    const contact = channel.related('contact')
    return {
      phone_number: {
        id: phone_number.get('id'),
        number: phone_number.get('number')
      },
      program: {
        id: program.get('id'),
        title: program.get('title'),
        logo: program.related('logo') ? program.related('logo').get('path') : null,
        phone_number: {
          id: program.related('phone_number').get('id'),
          number: program.related('phone_number').get('number'),
          formatted: program.related('phone_number').get('formatted')
        }
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

export default lookupRoute
