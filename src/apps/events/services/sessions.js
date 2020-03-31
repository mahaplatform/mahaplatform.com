import { whitelist } from '../../../core/services/routes/params'
import Session from '../models/session'

export const updateSessions = async (req, { sessions }) => {
  await Promise.mapSeries(sessions, async (session) => {
    await Session.forge({
      team_id: req.team.get('id'),
      event_id: event.get('id'),
      ...whitelist(session, ['location_id','is_online','title','date','start_time','end_time'])
    }).save(null, {
      transacting: req.trx
    })
  })
}
