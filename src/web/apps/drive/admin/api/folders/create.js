import FolderSerializer from '../../../serializers/folder_serializer'
import { createFolder } from '../../../services/folders'
import Item from '../../../models/item'

const createRoute = async (req, res) => {

  const preexisting = await Item.scope({
    team: req.team
  }).query(qb => {
    qb.select('drive_items.*','drive_access_types.text as access_type')
    qb.joinRaw('inner join drive_items_access on drive_items_access.code=drive_items.code and drive_items_access.user_id=?', req.user.get('id'))
    qb.innerJoin('drive_access_types', 'drive_access_types.id', 'drive_items_access.access_type_id')
    qb.whereNull('drive_items.deleted_at')
    qb.where('folder_id', req.body.parent_id)
    qb.where('label', req.body.label)
  }).fetch({
    transacting: req.trx
  })

  if(preexisting) return res.status(412).respond({
    code: 412,
    message: 'A folder by that name already exists'
  })

  const folder = await createFolder(req, req.body)

  res.status(200).respond(folder, FolderSerializer)

}

export default createRoute
