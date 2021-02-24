import EventType from '@apps/analytics/models/event_type'

const getType = (enriched) => {
  if(enriched.event !== 'unstruct') return enriched.event
  const matches = enriched.unstruct_event.data.schema.match(/iglu:([^/]*)\/([^/]*)/)
  return matches[2]
}

export const getEventType = async(req, { enriched }) => {

  const type = getType(enriched)

  return await EventType.fetchOrCreate({
    type
  }, {
    transacting: req.analytics
  })

}
