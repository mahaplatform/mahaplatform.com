import Session from '@apps/events/models/session'

const editRoute = async (req, res) => {

  const session = await Session.query(qb => {
    qb.where('team_id', req.team.get('id'))
    qb.where('id', req.params.id)
  }).fetch({
    withRelated: ['location'],
    transacting: req.trx
  })

  if(!session) return res.status(404).respond({
    code: 404,
    message: 'Unable to load session'
  })

  res.status(200).respond({
    title: session.get('title'),
    location: session.get('location_id') ? {
      id: session.related('location').get('id'),
      name: session.related('location').get('name'),
      address: session.related('location').get('address')
    } : null,
    is_online: session.get('is_online'),
    date: session.get('date'),
    start_time: session.get('start_time'),
    end_time: session.get('end_time')
  })

}

export default editRoute
