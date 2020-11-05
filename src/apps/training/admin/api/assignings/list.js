import AssigningsSerializer from '@apps/training/serializers/assigning_serializer'
import Assigning from '@apps/training/models/assigning'

const listRoute = async (req, res) => {

  const assignings = await Assigning.filterFetch({
    scope: qb => {
      qb.where('team_id', req.team.get('id'))
    },
    filter: {
      params: req.query.$filter,
      allowed: ['assigning_id','user_id']
    },
    sort: {
      params: req.query.$sort,
      defaults: '-created_at'
    },
    page: req.query.$page,
    withRelated: ['assigned_by','assignments'],
    transacting: req.trx
  })

  res.status(200).respond(assignings, AssigningsSerializer)

}

export default listRoute
