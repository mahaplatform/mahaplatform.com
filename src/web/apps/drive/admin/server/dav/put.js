import { createAsset, updateAsset } from '../../../../maha/services/assets'
import socket from '../../../../../core/services/routes/emitter'
import { createMetaFile } from '../../../services/metafiles'
import knex from '../../../../../core/services/knex'
import { createFile } from '../../../services/files'
import MetaFile from '../../../models/metafile'
import Folder from '../../../models/folder'
import Item from '../../../models/item'

const create = async (req, folder) => {

  if(req.is_metafile) {

    return await createMetaFile(req, {
      team_id: req.team.get('id'),
      label: req.label,
      folder,
      file_size: req.rawBody.length === 0 ? 0 : null,
      contents: req.rawBody.length === 0 ? null : req.rawBody
    })

  } else {

    const asset = await createAsset(req, {
      team_id: req.team.get('id'),
      user_id: req.user.get('id'),
      source_id: 1,
      file_data: req.rawBody.length === 0 ? null : req.rawBody,
      file_size: req.rawBody.length === 0 ? 0 : null,
      file_name: req.label
    })

    return await createFile(req, {
      asset,
      folder
    })

  }
}

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

    const file = await create(req, folder)

    req.item = await Item.query(qb => {
      qb.where('code', file.get('code'))
    }).fetch({
      withRelated: ['folder'],
      transacting: req.trx
    })

  } else if(req.item.get('type') === 'file') {

    await req.item.load(['asset','folder'], {
      transacting: req.trx
    })

    await updateAsset(req, req.item.related('asset'), {
      file_data: req.rawBody.length === 0 ? null : req.rawBody,
      file_size: req.rawBody.length === 0 ? 0 : null
    })

  } else if(req.item.get('type') === 'metafile') {

    const metafile = await MetaFile.query(qb => {
      qb.where('id', req.item.get('item_id'))
    }).fetch({
      transacting: req.trx
    })

    await metafile.save({
      file_size: req.rawBody.length === 0 ? 0 : req.rawBody.length,
      contents: req.rawBody.length === 0 ? null : req.rawBody
    },{
      patch: true,
      transacting: req.trx
    })

  }

  await socket.refresh(req, [
    `/admin/drive/folders/${req.item.related('folder').get('code') || 'drive'}`,
    `/admin/drive/files/${req.item.get('code')}`,
    '/admin/drive/folders/trash'
  ])

  res.status(200).send(null)

}

export default route
