import FileSerializer from '../../../serializers/file_serializer'
import { createFile } from '../../../services/files'
import Item from '../../../models/item'

const createRoute = async (req, res) => {

  const preexisting = await Item.scope({
    team: req.team
  }).query(qb => {
    qb.joinRaw('inner join drive_items_access on drive_items_access.code=drive_items.code and drive_items_access.user_id=?', req.user.get('id'))
    qb.whereNull('drive_items.deleted_at')
    qb.where('folder_id', req.body.folder_id)
    qb.where('label', req.body.label)
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

  await file.load(['folder', 'current_version.asset','current_version.asset.user.photo','current_version.asset.source','versions.asset.source','versions.user','accesses.user.photo','accesses.group','accesses.access_type'], {
    transacting: req.trx
  })

  res.status(200).respond(file, FileSerializer)

}

export default createRoute
