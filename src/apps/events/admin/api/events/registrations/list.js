import RegistrationSerializer from '../../../../serializers/registration_serializer'
import Registration from '../../../../models/registration'

const listRoute = async (req, res) => {

  const registrations = await Registration.filterFetch({
    scope: (qb) => {
      qb.select(req.trx.raw('events_registrations.*,events_registration_totals.*'))
      qb.innerJoin('events_registration_totals','events_registration_totals.registration_id','events_registrations.id')
      qb.where('events_registrations.team_id', req.team.get('id'))
      qb.where('events_registrations.event_id', req.params.event_id)
    },
    filter: {
      params: req.query.$filter,
      allowed: ['title'],
      search: ['title']
    },
    sort: {
      params: req.query.$sort,
      defaults: '-created_at',
      allowed: ['created_at']
    },
    page: req.query.$page,
    withRelated: ['contact'],
    transacting: req.trx
  })

  res.status(200).respond(registrations, RegistrationSerializer)

}

export default listRoute
