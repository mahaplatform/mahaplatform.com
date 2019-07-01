import socket from '../../../../../core/services/routes/emitter'
import { restoreFromTrash } from '../../../services/items'
import Item from '../../../models/item'

const restoreAllRoute = async (req, res) => {

  const items = await Item.query(qb => {
    qb.joinRaw('inner join drive_items_access on drive_items_access.code=drive_items.code and drive_items_access.user_id=?', req.user.get('id'))
    qb.leftJoin('drive_folders', 'drive_folders.id', 'drive_items.folder_id')
    qb.whereRaw('drive_items.deleted_at is not null and (drive_items.folder_id is null or drive_folders.deleted_at is null)')
  }).fetchAll({
    withRelated: ['folder'],
    transacting: req.trx
  }).then(items => items.toArray())

  await Promise.mapSeries(items, async (item) => {
    await restoreFromTrash(req, item)
  })

  const folders = items.map(item => {
    return `/admin/drive/folders/${item.related('folder').get('code') || 'drive'}`
  })

  await socket.refresh(req, [
    '/admin/drive/folders/trash',
    ...folders
  ])

  res.status(200).respond(true)

}

export default restoreAllRoute
