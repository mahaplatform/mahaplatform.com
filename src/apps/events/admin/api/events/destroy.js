import { activity } from '../../../../../core/services/routes/activities'
import { audit } from '../../../../../core/services/routes/audit'
import socket from '../../../../../core/services/routes/emitter'
import Event from '../../../models/event'
import moment from 'moment'

const destroyRoute = async (req, res) => {

  const event = await Event.query(qb => {
    qb.where('team_id', req.team.get('id'))
    qb.whereNull('deleted_at')
    qb.where('id', req.params.id)
  }).fetch({
    withRelated: ['workflows','emails'],
    transacting: req.trx
  })

  if(!event) return res.status(404).respond({
    code: 404,
    message: 'Unable to load event'
  })

  await event.save({
    deleted_at: moment()
  }, {
    transacting: req.trx
  })

  await Promise.mapSeries(event.related('emails'), async (email) => {
    await email.save({
      deleted_at: moment()
    }, {
      patch: true,
      transacting: req.trx
    })
  })

  await Promise.mapSeries(event.related('workflows'), async (workflow) => {
    await workflow.save({
      deleted_at: moment()
    }, {
      patch: true,
      transacting: req.trx
    })
  })

  await audit(req, {
    story: 'deleted',
    auditable: event
  })

  await activity(req, {
    story: 'deleted {object}',
    object: event
  })

  await socket.refresh(req, [
    '/admin/events/events',
    `/admin/events/events/${event.get('id')}`
  ])

  res.status(200).respond(true)

}

export default destroyRoute
