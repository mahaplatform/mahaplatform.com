import { whitelist } from '../../../core/services/routes/params'
import Session from '../models/session'

export const updateSessions = async (req, { event, sessions }) => {

  await event.load(['sessions'], {
    transacting: req.trx
  })

  const existing = event.related('sessions')

  const add = sessions.filter(session => {
    return !session.id
  })

  const update = sessions.filter(session => {
    return session.id !== undefined
  })

  const destroy = existing.filter(existing => {
    return sessions.find(session => {
      return session.id === existing.get('id')
    }) === undefined
  })

  await Promise.mapSeries(add, async (data) => {
    await Session.forge({
      team_id: req.team.get('id'),
      event_id: event.get('id'),
      ...whitelist(data, ['location_id','is_online','title','description','date','start_time','end_time'])
    }).save(null, {
      transacting: req.trx
    })
  })

  await Promise.mapSeries(update, async (data) => {

    const session = existing.find(session => {
      return session.get('id') === data.id
    })

    await session.save({
      ...whitelist(data, ['location_id','is_online','title','description','date','start_time','end_time'])
    }, {
      transacting: req.trx,
      patch: true
    })

  })

  await Promise.mapSeries(destroy, async (session) => {
    await session.destroy({
      transacting: req.trx,
      patch: true
    })
  })

}
