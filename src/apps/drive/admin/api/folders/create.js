import FolderSerializer from '@apps/drive/serializers/folder_serializer'
import { createFolder } from '@apps/drive/services/folders'
import Item from '@apps/drive/models/item'

const createRoute = async (req, res) => {

  const preexisting = await Item.query(qb => {
    qb.where('team_id', req.team.get('id'))
    qb.joinRaw('inner join drive_items_access on drive_items_access.code=drive_items.code and drive_items_access.user_id=?', req.user.get('id'))
    qb.whereNull('drive_items.deleted_at')
    if(req.body.parent_id) {
      qb.where('folder_id', req.body.parent_id)
    } else {
      qb.whereNull('folder_id')
    }
    qb.where('label', req.body.label)
  }).fetch({
    transacting: req.trx
  })

  if(preexisting) return res.status(422).json({
    status: 422,
    message: 'Unable to save record',
    errors: {
      label: ['A folder by this name already exists']
    }
  })

  const folder = await createFolder(req, req.body)

  await res.status(200).respond(folder, FolderSerializer)

}

export default createRoute
