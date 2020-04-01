import { activity } from '../../../../../core/services/routes/activities'
import OrganizerSerializer from '../../../serializers/organizer_serializer'
import socket from '../../../../../core/services/routes/emitter'
import { whitelist } from '../../../../../core/services/routes/params'
import Organizer from '../../../models/organizer'

const createRoute = async (req, res) => {

  const organizer = await Organizer.forge({
    team_id: req.team.get('id'),
    ...whitelist(req.body, ['photo_id','name','email','phone'])
  }).save(null, {
    transacting: req.trx
  })

  await organizer.load(['photo'], {
    transacting: req.trx
  })

  await activity(req, {
    story: 'created {object}',
    object: organizer
  })

  await socket.refresh(req, [
    '/admin/events/organizers'
  ])

  res.status(200).respond(organizer, OrganizerSerializer)

}

export default createRoute
