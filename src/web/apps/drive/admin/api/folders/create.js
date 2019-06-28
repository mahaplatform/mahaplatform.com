import FolderSerializer from '../../../serializers/folder_serializer'
import socket from '../../../../../core/services/routes/emitter'
import { createFolder } from '../../../services/folders'

const createRoute = async (req, res) => {

  const folder = await createFolder(req, req.body)

  await socket.refresh(req, [
    `/admin/drive/folders/${folder.related('folder').get('code') || 'drive'}`
  ])

  res.status(200).respond(folder, FolderSerializer)

}

export default createRoute
