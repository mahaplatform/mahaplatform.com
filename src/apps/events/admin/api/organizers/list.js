import OrganizerSerializer from '@apps/events/serializers/organizer_serializer'
import Organizer from '@apps/events/models/organizer'

const listRoute = async (req, res) => {

  const organizers = await Organizer.filterFetch({
    scope: (qb) => {
      qb.where('team_id', req.team.get('id'))
    },
    filter: {
      params: req.query.$filter,
      allowed: ['name'],
      search: ['name']
    },
    sort: {
      params: req.query.$sort,
      defaults: 'name',
      allowed: ['name']
    },
    page: req.query.$page,
    withRelated: ['photo'],
    transacting: req.trx
  })

  await res.status(200).respond(organizers, OrganizerSerializer)

}

export default listRoute
