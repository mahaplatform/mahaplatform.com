import TripSerializer from '../../../serializers/trip_serializer'
import Trip from '../../../models/trip'

const showRoute = async (req, res) => {

  const trip = await Trip.scope(qb => {
    qb.where('team_id', req.team.get('id'))
  }).query(qb => {
    qb.where('id', req.params.id)
  }).fetch({
    withRelated: ['user','project.members','expense_type','audit.story','audit.user.photo'],
    transacting: req.trx
  })

  if(!trip) return res.status(404).respond({
    code: 404,
    message: 'Unable to load trip'
  })

  res.status(200).respond(trip, TripSerializer)

}

export default showRoute
