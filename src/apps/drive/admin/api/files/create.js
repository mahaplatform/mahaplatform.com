import FileSerializer from '@apps/drive/serializers/file_serializer'
import { createFile } from '@apps/drive/services/files'
import Asset from '@apps/maha/models/asset'
import Item from '@apps/drive/models/item'

const createRoute = async (req, res) => {

  const asset = await Asset.where({
    id: req.body.asset_id
  }).fetch({
    transacting: req.trx
  })

  const preexisting = await Item.query(qb => {
    qb.joinRaw('inner join drive_items_access on drive_items_access.code=drive_items.code and drive_items_access.user_id=?', req.user.get('id'))
    qb.whereNull('drive_items.deleted_at')
    qb.where('folder_id', req.body.folder_id)
    qb.where('label', asset.get('original_file_name'))
  }).fetch({
    transacting: req.trx
  })

  if(preexisting) return res.status(412).respond({
    code: 412,
    message: 'A file by that name already exists'
  })

  const file = await createFile(req, {
    asset_id: req.body.asset_id,
    folder_id: req.body.folder_id
  })

  await file.load(['folder', 'current_version.asset','current_version.asset.user.photo','current_version.asset','versions.asset','versions.user','accesses.user.photo','accesses.group','accesses.access_type'], {
    transacting: req.trx
  })

  await res.status(200).respond(file, FileSerializer)

}

export default createRoute
