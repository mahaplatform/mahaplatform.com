import socket from '../../../../../core/services/routes/emitter'
import Folder from '../../../models/folder'
import File from '../../../models/file'
import Item from '../../../models/item'
import { renameFolder } from '../../../services/folders'
import { renameMetaFile } from '../../../services/metafiles'
import { renameFile } from '../../../services/files'

const models = {
  file: { model: File, foreign_key: 'folder_id' },
  folder: { model: Folder, foreign_key: 'parent_id' }
}

const moveRoute = async (req, res) => {

  const items = await Item.scope(qb => {
    qb.where('team_id', req.team.get('id'))
  }).query(qb => {
    qb.joinRaw('inner join drive_items_access on drive_items_access.code=drive_items.code and drive_items_access.user_id=?', req.user.get('id'))
    qb.whereRaw('drive_items.type != ?', 'metafile')
    qb.whereNull('drive_items.deleted_at')
    qb.whereIn('drive_items.code', req.body.codes)
  }).fetchAll({
    withRelated: ['folder'],
    transacting: req.trx
  }).then(items => items.toArray())

  const folder = await Folder.scope(qb => {
    qb.where('team_id', req.team.get('id'))
  }).query(qb => {
    qb.where('id', req.body.folder_id)
  }).fetch({
    transacting: req.trx
  })

  await Promise.mapSeries(items, async (item) => {

    const model = models[item.get('type')]

    const element = await model.model.where({
      id: item.get('item_id')
    }).fetch({
      transacting: req.trx
    })

    if(item.get('type') === 'folder') {
      await renameFolder(req, element, {
        folder
      })
    } else if(item.get('type') === 'metafile') {
      await renameMetaFile(req, element, {
        folder
      })
    } else if(item.get('type') === 'file') {
      await renameFile(req, element, {
        folder
      })
    }

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
