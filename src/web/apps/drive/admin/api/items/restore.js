import socket from '../../../../../core/services/routes/emitter'
import { restoreFromTrash } from '../../../services/items'
import Item from '../../../models/item'

const restoreRoute = async (req, res) => {

  const items = await Item.query(qb => {
    qb.joinRaw('inner join drive_items_access on drive_items_access.code=drive_items.code and drive_items_access.user_id=?', req.user.get('id'))
    qb.whereRaw('drive_items.type != ?', 'metafile')
    qb.whereIn('drive_items.code', req.body.codes)
  }).fetchAll({
    withRelated: ['folder'],
    transacting: req.trx
  }).then(items => items.toArray())

  await Promise.mapSeries(items, async (item) => {

    await restoreFromTrash(req, item)

    await socket.message(req, {
      channel: '/admin/drive',
      action: 'restore_item',
      data: {
        code: req.params.code
      }
    })

    await socket.refresh(req, [
      `/admin/drive/folders/${item.related('folder').get('code') || 'drive'}`,
      `/admin/drive/files/${item.get('code')}`
    ])

  })

  await socket.refresh(req, [
    '/admin/drive/folders/trash'
  ])

  res.status(200).respond(true)

}

export default restoreRoute
