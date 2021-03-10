import ChannelSerializer from '@apps/crm/serializers/channel_serializer'
import Contact from '@apps/crm/models/contact'
import Channel from '@apps/crm/models/channel'
import _ from 'lodash'

const showRoute = async (req, res) => {

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
    qb.where('type', req.params.type)
    if(req.params.type === 'email') qb.where('email_address_id', req.params.id)
    if(_.includes(['sms','voice'], req.params.type)) qb.where('phone_number_id', req.params.id)
  }).fetch({
    transacting: req.trx
  })

  await res.status(200).respond(channel, ChannelSerializer)

}

export default showRoute
