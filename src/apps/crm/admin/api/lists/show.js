import ListSerializer from '../../../serializers/list_serializer'
import List from '../../../models/list'

const showRoute = async (req, res) => {

  const list = await List.scope({
    team: req.team
  }).query(qb => {
    qb.where('id', req.params.id)
  }).fetch({
    transacting: req.trx
  })

  if(!list) return res.status(404).respond({
    code: 404,
    message: 'Unable to load list'
  })

  res.status(200).respond(list, ListSerializer)

}

export default showRoute
