import Program from '../../../../../maha/models/program'
import Contact from '../../../../models/contact'

const editRoute = async (req, res) => {

  const contact = await Contact.scope({
    team: req.team
  }).query(qb => {
    qb.where('id', req.params.id)
  }).fetch({
    transacting: req.trx
  })

  if(!contact) return res.status(404).respond({
    code: 404,
    message: 'Unable to load contact'
  })

  const programs = await Program.scope({
    team: req.team
  }).fetchAll({
    withRelated: ['logo'],
    transacting: req.trx
  }).then(results => results.toArray())

  const interests = await req.trx('crm_interests')
    .where('contact_id', contact.get('id'))

  const channels = await req.trx('crm_channels')
    .where('team_id', req.team.get('id'))
    .where('has_consented', true)
    .where('contact_id', contact.get('id'))

  const consent = programs.map(program => ({
    program_id: program.get('id'),
    topic_ids: interests.filter(interest => {
      return interest.get('program_id') === program.get('id')
    }),
    address_ids: channels.filter(channel => {
      return channel.program_id === program.get('id') && channel.address_id !== null
    }).map(channel => channel.address_id),
    phone_number_ids: channels.filter(channel => {
      return channel.program_id === program.get('id') && channel.phone_number_id !== null
    }).map(channel => channel.phone_number_id),
    email_address_ids: channels.filter(channel => {
      return channel.program_id === program.get('id') && channel.email_address_id !== null
    }).map(channel => channel.email_address_id)
  }))

  res.status(200).respond({ consent })

}

export default editRoute
