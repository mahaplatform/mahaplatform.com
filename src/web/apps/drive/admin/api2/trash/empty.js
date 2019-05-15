import socket from '../../../../../core/services/routes/emitter'
import Folder from '../../../models/folder'
import File from '../../../models/file'
import Item from '../../../models/item'

const emptyRoute = async (req, res) => {

  const items = await Item.query(qb => {
    qb.select('drive_items.*','drive_access_types.text as access_type')
    qb.innerJoin('drive_items_access', 'drive_items_access.code', 'drive_items.code')
    qb.innerJoin('drive_access_types', 'drive_access_types.id', 'drive_items_access.access_type_id')
    qb.leftJoin('drive_folders', 'drive_folders.id', 'drive_items.folder_id')
    qb.where('drive_items_access.user_id', req.user.get('id'))
    qb.whereRaw('drive_items.deleted_at is not null and (drive_items.folder_id is null or drive_folders.deleted_at is null)')
  }).fetchAll({
    transacting: req.trx
  }).then(items => items.toArray())

  await Promise.map(items, async(item) => {

    if(item.get('type') === 'folder') {

      const folder = await Folder.where({
        code: item.get('code')
      }).fetch({
        transacting: req.trx
      })

      await folder.destroy({
        transacting: req.trx
      })

    } else {

      const file = await File.where({
        code: item.get('code')
      }).fetch({
        withRelated: ['versions'],
        transacting: req.trx
      })

      await file.save({
        version_id: null
      }, {
        transacting: req.trx
      })

      await Promise.map(file.related('versions').toArray(), async (version) => {
        await version.destroy({
          transacting: req.trx
        })
      })

      await file.destroy({
        transacting: req.trx
      })

    }

  })

  await socket.refresh(req, [
    '/admin/drive/folders/trash'
  ])

  res.status(200).respond(true)

}

export default emptyRoute
