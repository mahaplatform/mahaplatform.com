import EventType from '@apps/analytics/models/event_type'

const getType = (data) => {
  if(data.event === 'unstruct' && /social_interaction/.test(data.event)) return 'social_interaction'
  return data.event
}

export const getEventType = async(req, { data }) => {

  const type = getType(data)

  return await EventType.fetchOrCreate({
    type
  }, {
    transacting: req.analytics
  })

}
