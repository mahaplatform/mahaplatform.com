import item_serializer from '../../../serializers/item_serializer.xml'
import Item from '../../../models/item'

const getChildren = async (req, user, item, depth) => {

  if(item && item.get('type') === 'file') return []

  return await Item.query(qb => {
    if(!item) qb.whereNull('folder_id')
    if(item && item.get('type') === 'folder' && depth > 0) qb.where('folder_id', item.get('item_id'))
    qb.select('drive_items.*','drive_access_types.text as access_type')
    qb.innerJoin('drive_items_access', 'drive_items_access.code', 'drive_items.code')
    qb.innerJoin('drive_access_types', 'drive_access_types.id', 'drive_items_access.access_type_id')
    qb.where('drive_items_access.user_id', user.get('id'))
    qb.whereNull('drive_items.deleted_at')
    qb.orderBy('label', 'asc')
  }).fetchAll({
    withRelated: ['asset'],
    transacting: req.trx
  })

}

const getProps = async (req, user, item, props, depth) => {
  const children = await getChildren(req, user, item, depth)
  return item_serializer(item, props, children)
}

const route = async (req, res) => {
  const props = req.body['D:propfind']['D:prop'][0]
  const data = await getProps(req, req.user, req.item, props, req.headers.depth)
  res.status(207).type('application/xml').send(data)
}

export default route
