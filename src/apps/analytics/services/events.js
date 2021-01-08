import EventType from '@apps/analytics/models/event_type'
import Event from '@apps/analytics/models/event'
import { getPage } from './page'

export const createEvent = async(req, { session, raw }) => {

  const event_type = await EventType.fetchOrCreate({
    type: raw.get('event')
  }, {
    transacting: req.trx
  })

  const page = await getPage(req, {
    url: raw.get('page_url'),
    urlscheme: raw.get('page_urlscheme'),
    urlhost: raw.get('page_urlhost'),
    urlport: raw.get('page_urlport'),
    urlpath: raw.get('page_urlpath'),
    urlquery: raw.get('page_urlquery'),
    urlfragment: raw.get('page_urlfragment')
  })

  return await Event.forge({
    session_id: session.get('id'),
    event_type_id: event_type.get('id'),
    event_id: raw.get('event_id'),
    tstamp: raw.get('dvce_created_tstamp'),
    page_id: page.get('id')
  }).save(null, {
    transacting: req.trx
  })

}
