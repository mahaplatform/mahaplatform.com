import ImportItemSerializer from '../../../../serializers/import_item_serializer'
import ImportItem from '../../../../models/import_item'

const showRoute = async (req, res) => {

  const item = await ImportItem.scope({
    team: req.team
  }).query(qb => {
    qb.where('id', req.params.id)
  }).fetch({
    transacting: req.trx
  })

  if(!item) return req.status(404).respond({
    code: 404,
    message: 'Unable to load import item'
  })

  res.status(200).respond(item, (item) => {
    return ImportItemSerializer(req, req.trx, item)
  })

}

export default showRoute
