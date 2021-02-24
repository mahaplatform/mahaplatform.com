import Context from '@apps/analytics/models/context'
import Event from '@apps/analytics/models/event'
import { getPage } from './pages'
import { getData } from './data'

export const createEvent = async(req, { event_type, session, enriched }) => {

  const event = await Event.query(qb => {
    qb.where('event_id', enriched.event_id)
  }).fetch({
    transacting: req.analytics
  })

  if(event) return event

  const context = await Context.fetchOrCreate({
    context_id: enriched.context_id
  },{
    transacting: req.analytics
  })

  const page = enriched.page_url ? await getPage(req, {
    enriched
  }) : null

  return await Event.forge({
    session_id: session.get('id'),
    event_type_id: event_type.get('id'),
    page_id: page ? page.get('id') : null,
    context_id: context.get('id'),
    event_id: enriched.event_id,
    tstamp: enriched.dvce_created_tstamp,
    doc_width: enriched.doc_width,
    doc_height: enriched.doc_height,
    view_width: enriched.br_viewwidth,
    view_height: enriched.br_viewheight,
    data: getData(req, {
      type: event_type.get('type'),
      enriched
    })
  }).save(null, {
    transacting: req.analytics
  })

}
