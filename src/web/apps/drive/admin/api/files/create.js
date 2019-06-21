import FileSerializer from '../../../serializers/file_serializer'
import { createFile } from '../../../services/files'

const createRoute = async (req, res) => {

  const file = await createFile(req, {
    asset_id: req.body.asset_id,
    folder_id: req.body.folder_id
  })

  await file.load(['current_version.asset','current_version.asset.user.photo','current_version.asset.source','versions.asset.source','versions.user','accesses.user.photo','accesses.group','accesses.access_type'], {
    transacting: req.trx
  })

  res.status(200).respond(file, FileSerializer)

}

export default createRoute
