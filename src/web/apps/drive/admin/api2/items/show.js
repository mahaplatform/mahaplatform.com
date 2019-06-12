import ItemSerializer from '../../../serializers/item_serializer'
import Item from '../../../models/item'

const showRoute = async (req, res) => {

  const item = await Item.query(qb => {
    qb.where('team_id', req.team.get('id'))
    qb.select('drive_items.*','drive_access_types.text as access_type')
    qb.innerJoin('drive_items_access', 'drive_items_access.code', 'drive_items.code')
    qb.innerJoin('drive_access_types', 'drive_access_types.id', 'drive_items_access.access_type_id')
    qb.where('drive_items_access.user_id', req.user.get('id'))
    qb.whereNull('drive_items.deleted_at')
    qb.where('drive_items.code', req.params.code)
  }).fetch({
    withRelated: ['asset.source','accesses.access_type','accesses.user.photo','accesses.group','folder'],
    transacting: req.trx
  })

  res.status(200).respond(item, (item) => {
    return ItemSerializer(req, req.trx, item)
  })

}

export default showRoute
