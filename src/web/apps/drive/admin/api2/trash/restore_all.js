import socket from '../../../../../core/services/routes/emitter'
import knex from '../../../../../core/services/knex'
import Item from '../../../models/item'

const restoreAllRoute = async (req, res) => {

  const items = await Item.query(qb => {
    qb.select('drive_items.*','drive_access_types.text as access_type')
    qb.innerJoin('drive_items_access', 'drive_items_access.code', 'drive_items.code')
    qb.innerJoin('drive_access_types', 'drive_access_types.id', 'drive_items_access.access_type_id')
    qb.leftJoin('drive_folders', 'drive_folders.id', 'drive_items.folder_id')
    qb.where('drive_items_access.user_id', req.user.get('id'))
    qb.whereRaw('drive_items.deleted_at is not null and (drive_items.folder_id is null or drive_folders.deleted_at is null)')
  }).fetchAll({
    transacting: req.trx
  })

  const codes = items.map(item => {
    return item.get('code')
  })

  await knex('drive_files').transacting(req.trx).whereIn('code', codes).update({
    deleted_at: null
  })

  const folders = items.map(item => {
    return `/admin/drive/folders/${item.get('folder_id') || 'drive'}`
  })

  await socket.refresh(req, [
    '/admin/drive/folders/trash',
    ...folders
  ])

  res.status(200).respond(true)

}

export default restoreAllRoute
