import ListSerializer from '../../../serializers/list_serializer'
import List from '../../../models/list'

const showRoute = async (req, res) => {

  const list = await List.scope(qb => {
    qb.where('team_id', req.team.get('id'))
  }).query(qb => {
    qb.where('id', req.params.id)
  }).fetch({
    transacting: req.trx
  })

  res.status(200).respond(list, ListSerializer)

}

export default showRoute
