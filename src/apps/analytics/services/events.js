import Context from '@apps/analytics/models/context'
import Event from '@apps/analytics/models/event'
import { getPage } from './pages'
import { getData } from './data'

export const createEvent = async(req, { data, event_type, session }) => {

  const event = await Event.query(qb => {
    qb.where('event_id', data.event_id)
  }).fetch({
    transacting: req.analytics
  })

  if(event) return event

  const context = await Context.fetchOrCreate({
    context_id: data.context_id
  },{
    transacting: req.analytics
  })

  const page = data.page_url ? await getPage(req, {
    title: data.page_title,
    url: data.page_url
  }) : null

  return await Event.forge({
    session_id: session.get('id'),
    event_type_id: event_type.get('id'),
    page_id: page ? page.get('id') : null,
    context_id: context.get('id'),
    event_id: data.event_id,
    tstamp: data.dvce_created_tstamp,
    doc_width: data.doc_width,
    doc_height: data.doc_height,
    view_width: data.br_viewwidth,
    view_height: data.br_viewheight,
    data: getData(req, {
      type: event_type.get('type'),
      data
    })
  }).save(null, {
    transacting: req.analytics
  })

}
