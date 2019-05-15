import socket from '../../../../../core/services/routes/emitter'
import { deleteForever } from '../../../services/items'
import Item from '../../../models/item'

const destroyRoute = async (req, res) => {

  const item = await Item.where({
    code: req.params.code
  }).fetch({
    transacting: req.trx
  })

  await deleteForever(item, req.trx)

  await socket.refresh(req, [
    `/admin/drive/folders/${item.get('folder_id') || 'drive'}`,
    '/admin/drive/folders/trash'
  ])

  res.status(200).respond(true)

}

export default destroyRoute
