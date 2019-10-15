import ListSerializer from '../../../serializers/list_serializer'
import List from '../../../models/list'

const listRoute = async (req, res) => {

  const lists = await List.scope(qb => {
    qb.where('team_id', req.team.get('id'))
  }).fetchPage({
    page: req.query.$page,
    transacting: req.trx
  })

  res.status(200).respond(lists, ListSerializer)

}

export default listRoute
