import ListSerializer from '../../../../serializers/list_serializer'
import List from '../../../../models/list'

const listRoute = async (req, res) => {

  const lists = await List.scope(qb => {
    qb.where('team_id', req.team.get('id'))
  }).filter({
    filter: req.query.$filter,
    filterParams: ['type']
  }).fetchPage({
    page: req.query.$page,
    transacting: req.trx
  })

  res.status(200).respond(lists, ListSerializer)

}

export default listRoute
