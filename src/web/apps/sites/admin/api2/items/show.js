import ItemSerializer from '../../../serializers/item_serializer'
import Item from '../../../models/item'

const showRoute = async (req, res) => {

  const item = await Item.query(qb => {
    qb.where('team_id', req.team.get('id'))
    qb.where('site_id', req.params.site_id)
    qb.where('type_id', req.params.type_id)
    qb.where('id', req.params.id)
  })

  if(!item) return req.status(404).respond({
    code: 404,
    message: 'Unable to load item'
  })

  res.status(200).respond(item, (item) => {
    return ItemSerializer(req, req.trx, item)
  })

}

export default showRoute
