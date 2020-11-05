import OrganizerSerializer from '../../../serializers/organizer_serializer'
import { activity } from '@core/services/routes/activities'
import { whitelist } from '@core/services/routes/params'
import { audit } from '@core/services/routes/audit'
import socket from '@core/services/routes/emitter'
import Organizer from '../../../models/organizer'

const updateRoute = async (req, res) => {

  const organizer = await Organizer.query(qb => {
    qb.where('team_id', req.team.get('id'))
    qb.where('id', req.params.id)
  }).fetch({
    transacting: req.trx
  })

  await organizer.save({
    ...whitelist(req.body, ['photo_id','name','email','phone'])
  }, {
    transacting: req.trx
  })

  await audit(req, {
    story: 'updated',
    auditable: organizer
  })

  await activity(req, {
    story: 'updated {object}',
    object: organizer
  })

  await socket.refresh(req, [
    '/admin/events/organizers',
    `/admin/events/organizers/${organizer.get('id')}`
  ])

  res.status(200).respond(organizer, OrganizerSerializer)

}

export default updateRoute
