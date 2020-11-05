import socket from '@core/services/routes/emitter'
import { deleteForever } from '../../../services/items'
import Item from '../../../models/item'

const destroyRoute = async (req, res) => {

  const items = await Item.query(qb => {
    qb.joinRaw('inner join drive_items_access on drive_items_access.code=drive_items.code and drive_items_access.user_id=?', req.user.get('id'))
    qb.whereRaw('drive_items.type != ?', 'metafile')
    qb.whereIn('drive_items.code', req.body.codes)
  }).fetchAll({
    withRelated: ['folder'],
    transacting: req.trx
  }).then(items => items.toArray())

  await Promise.mapSeries(items, async (item) => {

    const channels = [
      `/admin/drive/folders/${item.related('folder').get('code') || 'drive'}`,
      '/admin/drive/folders/trash'
    ]

    await deleteForever(req, item)

    await socket.refresh(req, channels)

  })

  res.status(200).respond(true)

}

export default destroyRoute
