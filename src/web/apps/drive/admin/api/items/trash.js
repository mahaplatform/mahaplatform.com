import socket from '../../../../../core/services/routes/emitter'
import { moveToTrash } from '../../../services/items'
import Item from '../../../models/item'

const trashRoute = async (req, res) => {

  const items = await Item.scope({
    team: req.team
  }).query(qb => {
    qb.select('drive_items.*','drive_access_types.text as access_type')
    qb.innerJoin('drive_items_access', 'drive_items_access.code', 'drive_items.code')
    qb.innerJoin('drive_access_types', 'drive_access_types.id', 'drive_items_access.access_type_id')
    qb.where('drive_items_access.user_id', req.user.get('id'))
    qb.whereNull('drive_items.deleted_at')
    qb.whereIn('drive_items.code', req.body.codes)
  }).fetchAll({
    withRelated: ['asset.source','accesses.access_type','accesses.user.photo','accesses.group','folder'],
    transacting: req.trx
  }).then(items => items.toArray())

  await Promise.mapSeries(items, async (item) => {

    await moveToTrash(req, item)

    await socket.refresh(req, [
      `/admin/drive/folders/${item.related('folder') ? item.related('folder').get('code') : 'drive'}`,
      '/admin/drive/folders/trash'
    ])

  })

  res.status(200).respond(true)

}

export default trashRoute
