import Event from '@analytics/models/event'

const eventValidation = async(req, data) => {

  const event = await Event.query(qb => {
    qb.where('event_id', data.eid)
  }).fetch({
    transacting: req.analytics
  })

  if(event) throw new Error('duplicate event_id')

}

export default eventValidation
