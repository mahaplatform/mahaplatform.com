import FolderSerializer from '../../../serializers/folder_serializer'
import { createFolder } from '../../../services/folders'

const createRoute = async (req, res) => {

  const folder = await createFolder(req, req.body)

  res.status(200).respond(folder, FolderSerializer)

}

export default createRoute
