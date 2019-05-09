import Item from '../../../models/item'
import item_serializer from './item_serializer'

const query = (qb, user) => {
  qb.select('drive_items.*','drive_access_types.text as access_type')
  qb.innerJoin('drive_items_access', 'drive_items_access.code', 'drive_items.code')
  qb.innerJoin('drive_access_types', 'drive_access_types.id', 'drive_items_access.access_type_id')
  qb.where('drive_items_access.user_id', user.get('id'))
  qb.whereNull('drive_items.deleted_at')
  qb.orderBy('label', 'asc')
}

const getChildren = async (user, item, depth) => {

  if(!item) return await Item.query(qb => {
    query(qb, user)
    qb.whereNull('folder_id')
  }).fetchAll({
    withRelated: ['asset']
  })

  if(item.get('type') === 'folder' && depth > 0) return await Item.query(qb => {
    query(qb, user)
    qb.where('folder_id', item.get('item_id'))
  }).fetchAll({
    withRelated: ['asset']
  })

  return []

}

const getProps = async (user, item, props, depth) => {

  const children = await getChildren(user, item, depth)

  return item_serializer(item, props, children)

}

const route = async (req, res) => {

  const fullpath = decodeURI(req.originalUrl.replace('/admin/drive/dav/', '')).replace(/\/+$/, '')

  const item = fullpath.length > 0 ? await Item.query(qb => {
    query(qb, req.user)
    qb.where({ fullpath })
  }).fetch({
    withRelated: ['asset']
  }) : null

  if(fullpath.length > 0 && !item) return res.status(404).type('application/xml').send()

  const props = req.body['D:propfind']['D:prop'][0]

  const data = await getProps(req.user, item, props, req.headers.depth)

  res.status(207).type('application/xml').send(data)

}

export default route
