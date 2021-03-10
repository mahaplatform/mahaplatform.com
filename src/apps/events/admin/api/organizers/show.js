import OrganizerSerializer from '@apps/events/serializers/organizer_serializer'
import Organizer from '@apps/events/models/organizer'

const showRoute = async (req, res) => {

  const organizer = await Organizer.query(qb => {
    qb.where('team_id', req.team.get('id'))
    qb.where('id', req.params.id)
  }).fetch({
    withRelated: ['photo'],
    transacting: req.trx
  })

  if(!organizer) return res.status(404).respond({
    code: 404,
    message: 'Unable to load organizer'
  })

  await res.status(200).respond(organizer, OrganizerSerializer)

}

export default showRoute
