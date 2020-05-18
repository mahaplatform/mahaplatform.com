import Program from '../../../../models/program'
import Contact from '../../../../models/contact'
import Channel from '../../../../models/channel'

const listRoute = async (req, res) => {

  const contact = await Contact.query(qb => {
    qb.where('team_id', req.team.get('id'))
    qb.where('id', req.params.contact_id)
  }).fetch({
    transacting: req.trx
  })

  if(!contact) return res.status(404).respond({
    code: 404,
    message: 'Unable to load contact'
  })

  const programs = await Program.query(qb => {
    qb.select(req.trx.raw('crm_programs.*,crm_program_user_access.type as access_type'))
    qb.joinRaw('inner join crm_program_user_access on crm_program_user_access.program_id=crm_programs.id and crm_program_user_access.user_id=?', req.user.get('id'))
    qb.where('team_id', req.team.get('id'))
  }).fetchAll({
    withRelated: ['logo'],
    transacting: req.trx
  }).then(results => results.toArray())

  const channels = await Channel.query(qb => {
    qb.where('team_id', req.team.get('id'))
    qb.where('contact_id', contact.get('id'))
  }).fetchAll({
    transacting: req.trx
  }).then(results => results.toArray())

  const consent = programs.map(program => ({
    id: program.get('id'),
    access_type: program.get('access_type'),
    title: program.get('title'),
    logo: program.get('logo_id') ? program.related('logo').get('path') : req.team.related('logo').get('path'),
    channels: [
      ...channels.filter(channel => {
        return channel.get('program_id') === program.get('id')
      }).map(channel => ({
        type: channel.get('type'),
        id: channel.get(channel.get('key')),
        label: channel.get('label'),
        optedin_at: channel.get('optedin_at'),
        optedout_at: channel.get('optedout_at'),
        optin_reason: channel.get('optin_reason'),
        optout_reason: channel.get('optout_reason'),
        optout_reason_other: channel.get('optout_reason_other'),
        code: channel.get('code'),
        has_consented: channel.get('has_consented')
      }))
    ]
  }))

  res.status(200).respond(consent)

}

export default listRoute
