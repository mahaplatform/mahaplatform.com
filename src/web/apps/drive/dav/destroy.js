import socket from '../../../core/services/routes/emitter'
import { moveToTrash } from '../services/items'

const route = async (req, res) => {

  await moveToTrash(req, req.item)

  await socket.refresh(req, [
    `/admin/drive/folders/${req.item.related('folder').get('code') || 'drive'}`,
    '/admin/drive/folders/trash'
  ])

  res.status(204).send(null)


}

export default route
