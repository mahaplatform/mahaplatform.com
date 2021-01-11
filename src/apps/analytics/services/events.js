import Event from '@apps/analytics/models/event'
import { getEventType } from './event_types'
import { getPage } from './pages'
import { getData } from './data'

export const createEvent = async(req, { data, session }) => {

  const event = await Event.query(qb => {
    qb.where('event_id', data.event_id)
  }).fetch({
    transacting: req.analytics
  })

  if(event) return event

  const event_type = await getEventType(req, { data })

  const page = data.page_url ? await getPage(req, {
    title: data.page_title,
    url: data.page_url
  }) : null

  return await Event.forge({
    session_id: session.get('id'),
    event_type_id: event_type.get('id'),
    page_id: page ? page.get('id') : null,
    event_id: data.event_id,
    tstamp: data.dvce_created_tstamp,
    data: getData(req, {
      type: event_type.get('type'),
      data
    })
  }).save(null, {
    transacting: req.analytics
  })

}
