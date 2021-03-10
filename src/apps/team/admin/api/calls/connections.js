import CallConnectionSerializer from '@apps/maha/serializers/call_connection_serializer'
import CallConnection from '@apps/maha/models/call_connection'
import Call from '@apps/maha/models/call'

const connectionsRoute = async (req, res) => {

  const call = await Call.query(qb => {
    qb.where('team_id', req.team.get('id'))
    qb.where('id', req.params.id)
  }).fetch({
    transacting: req.trx
  })

  if(!call) return res.status(404).respond({
    code: 404,
    message: 'Unable to load call'
  })

  const connections = await CallConnection.query(qb => {
    qb.where('team_id', req.team.get('id'))
    qb.where('call_id', call.get('id'))
    qb.orderBy('started_at', 'asc')
  }).fetchAll({
    withRelated: ['activities.story','from_number','from_phone_number.contact.photo','from_program.logo','from_user.photo','to_number','to_phone_number.contact.photo','to_program.logo','to_user.photo'],
    transacting: req.trx
  })

  await res.status(200).respond(connections, CallConnectionSerializer)

}

export default connectionsRoute
