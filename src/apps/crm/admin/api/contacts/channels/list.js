import ChannelSerializer from '@apps/crm/serializers/channel_serializer'
import Contact from '@apps/crm/models/contact'
import Channel from '@apps/crm/models/channel'

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

  const channel = await Channel.query(qb => {
    qb.where('team_id', req.team.get('id'))
    qb.where('contact_id', contact.get('id'))
    qb.where('program_id', req.params.program_id)
  }).fetchAll({
    withRelated: ['email_address','mailing_address','phone_number'],
    transacting: req.trx
  })

  await res.status(200).respond(channel, ChannelSerializer)

}

export default listRoute
