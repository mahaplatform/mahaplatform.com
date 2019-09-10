import Program from '../../../../../maha/models/program'
import Contact from '../../../../models/contact'
import Channel from '../../../../models/channel'

const listRoute = async (req, res) => {

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

  const channels = await Channel.scope({
    team: req.team
  }).query(qb => {
    qb.where('contact_id', contact.get('id'))
  }).fetchAll({
    transacting: req.trx
  }).then(results => results.toArray())

  const consent = programs.map(program => ({
    id: program.get('id'),
    title: program.get('title'),
    logo: program.get('logo_id') ? program.related('logo').get('path') : req.team.related('logo').get('path'),
    channels: [
      ...channels.filter(channel => {
        return channel.get('program_id') === program.get('id')
      }).map(channel => {
        return { type: channel.get('type'), id: channel.get(channel.get('key')), label: channel.get('label'), has_consented: channel.get('has_consented') }
      })
    ]
  }))

  res.status(200).respond(consent)

}

export default listRoute
