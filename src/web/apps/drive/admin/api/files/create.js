import FileSerializer from '../../../serializers/file_serializer'
import { createFile } from '../../../services/files'

const createRoute = async (req, res) => {

  const file = await createFile(req, {
    asset_id: req.body.asset_id,
    folder_id: req.body.folder_id
  })

  res.status(200).respond(file, FileSerializer)

}

export default createRoute
