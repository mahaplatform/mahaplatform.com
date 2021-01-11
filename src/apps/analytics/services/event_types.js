import EventType from '@apps/analytics/models/event_type'

const getType = (data) => {
  if(data.event !== 'unstruct') return data.event
  const matches = data.unstruct_event.data.schema.match(/snowplow\/([^/]*)/)
  return matches[1]
}

export const getEventType = async(req, { data }) => {

  const type = getType(data)

  return await EventType.fetchOrCreate({
    type
  }, {
    transacting: req.analytics
  })

}
