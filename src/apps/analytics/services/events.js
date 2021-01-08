import EventType from '@apps/analytics/models/event_type'
import Event from '@apps/analytics/models/event'
import { getPage } from './pages'

export const createEvent = async(req, { data, session }) => {

  const event_type = await EventType.fetchOrCreate({
    type: data.event
  }, {
    transacting: req.trx
  })

  const page = await getPage(req, {
    title: data.page_title,
    url: data.page_url
  })

  return await Event.forge({
    session_id: session.get('id'),
    event_type_id: event_type.get('id'),
    page_id: page.get('id'),
    event_id: data.event_id,
    tstamp: data.dvce_created_tstamp
  }).save(null, {
    transacting: req.trx
  })

}
