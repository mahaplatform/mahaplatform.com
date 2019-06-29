import { createAsset, updateAsset } from '../../../../maha/services/assets'
import socket from '../../../../../core/services/routes/emitter'
import knex from '../../../../../core/services/knex'
import { createFile } from '../../../services/files'
import Folder from '../../../models/folder'
import Item from '../../../models/item'

const route = async (req, res) => {

  if(req.if_token !== undefined && req.item && req.item.get('lock_token') !== req.if_token) {
    return res.status(403).send(null)
  }

  if(!req.item) {

    const folder = await Folder.where(qb => {
      qb.where('fullpath', req.parent_path)
    }).fetch({
      transacting: req.trx
    })

    if(folder) {

      const access = await knex('drive_items_access').transacting(req.trx).where({
        code: folder.get('code'),
        user_id: req.user.get('id')
      })

      if(access.length === 0 || access[0].access_type_id === 3) return res.status(403).send(null)

    }

    const asset = await createAsset(req, {
      team_id: req.team.get('id'),
      user_id: req.user.get('id'),
      content_type: req.label[0] === '.' ? 'application/octet-stream': null,
      source_id: 1,
      file_data: req.rawBody.length === 0 ? null : req.rawBody,
      file_size: req.rawBody.length === 0 ? 0 : null,
      file_name: req.label
    })

    const file = await createFile(req, {
      asset_id: asset.get('id'),
      folder_id: folder ? folder.get('id') : null
    })

    req.item = await Item.where('code', file.get('code')).fetch({
      transacting: req.trx
    })

  } else {

    await updateAsset(req, req.item.related('asset'), {
      file_data: req.rawBody.length === 0 ? null : req.rawBody,
      file_size: req.rawBody.length === 0 ? 0 : null
    })

  }

  await req.item.load(['folder'], {
    transacting: req.trx
  })

  await socket.refresh(req, [
    `/admin/drive/folders/${req.item.related('folder').get('code') || 'drive'}`,
    `/admin/drive/files/${req.item.get('code')}`,
    '/admin/drive/folders/trash'
  ])

  res.status(200).send(null)

}

export default route
