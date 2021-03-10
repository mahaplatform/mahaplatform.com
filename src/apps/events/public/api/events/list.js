import Event from '@apps/events/models/event'

const listRoute = async (req, res) => {

  const events = await Event.fetchAll({
    transacting: req.trx
  })

  await res.status(200).respond(events, (req, event) => ({
    code: event.get('code'),
    title: event.get('title')
  }))

}

export default listRoute
