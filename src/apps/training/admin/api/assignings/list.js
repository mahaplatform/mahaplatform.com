import AssigningsSerializer from '../../../serializers/assigning_serializer'
import Assigning from '../../../models/assigning'

const listRoute = async (req, res) => {

  const assignings = await Assigning.filter({
    scope: qb => {
      qb.where('team_id', req.team.get('id'))
    },
    filterParams: ['assigning_id','user_id'],
    filter: req.query.$filter,
    sort: req.query.$sort,
    defaultSort: '-created_at'
  }).fetchPage({
    withRelated: ['assigned_by','assignments'],
    page: req.query.$page,
    transacting: req.trx
  })

  res.status(200).respond(assignings, AssigningsSerializer)

}

export default listRoute
