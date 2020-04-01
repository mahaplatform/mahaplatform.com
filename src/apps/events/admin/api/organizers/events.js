import EventSerializer from '../../../serializers/event_serializer'
import Organizer from '../../../models/organizer'

const showRoute = async (req, res) => {

  const organizer = await Organizer.query(qb => {
    qb.where('team_id', req.team.get('id'))
    qb.where('id', req.params.organizer_id)
  }).fetch({
    withRelated: ['events'],
    transacting: req.trx
  })

  if(!organizer) return res.status(404).respond({
    code: 404,
    message: 'Unable to load organizer'
  })

  res.status(200).respond(organizer.related('events'), EventSerializer)

}

export default showRoute
