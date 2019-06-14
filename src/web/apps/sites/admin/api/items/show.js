import ItemSerializer from '../../../serializers/item_serializer'
import Item from '../../../models/item'

const showRoute = async (req, res) => {

  const item = await Item.scope({
    team: req.team
  }).query(qb => {
    qb.where('site_id', req.params.site_id)
    qb.where('type_id', req.params.type_id)
    qb.where('id', req.params.id)
  })

  if(!item) return req.status(404).respond({
    code: 404,
    message: 'Unable to load item'
  })

  res.status(200).respond(item, ItemSerializer)

}

export default showRoute
