import socket from '../../../../../core/services/routes/emitter'
import Folder from '../../../models/folder'
import File from '../../../models/file'
import Item from '../../../models/item'

const models = {
  file: { model: File, foreign_key: 'folder_id' },
  folder: { model: Folder, foreign_key: 'parent_id' }
}

const moveRoute = async (req, res) => {

  const folder = await Folder.where({
    id: req.body.folder_id
  }).fetch({
    transacting: req.trx
  })

  const items = await Item.query(qb => {
    qb.select('drive_items.*','drive_access_types.text as access_type')
    qb.innerJoin('drive_items_access', 'drive_items_access.code', 'drive_items.code')
    qb.innerJoin('drive_access_types', 'drive_access_types.id', 'drive_items_access.access_type_id')
    qb.where('drive_items_access.user_id', req.user.get('id'))
    qb.whereNull('drive_items.deleted_at')
    qb.whereIn('drive_items.code', req.body.codes)
  }).fetchAll({
    withRelated: ['folder'],
    transacting: req.trx
  }).then(items => items.toArray())

  await Promise.mapSeries(items, async (item) => {

    const model = models[item.get('type')]

    const element = await model.model.where({
      id: item.get('item_id')
    }).fetch({
      transacting: req.trx
    })

    await element.save({
      [model.foreign_key]: req.body.folder_id
    }, {
      patch: true,
      transacting: req.trx
    })

    await socket.refresh(req, [
      `/admin/drive/folders/${item.related('folder').get('code') || 'drive'}`
    ])

  })

  await socket.refresh(req, [
    `/admin/drive/folders/${folder.get('code') || 'drive'}`
  ])

  res.status(200).respond(true)

}

export default moveRoute
