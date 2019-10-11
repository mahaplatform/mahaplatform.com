import { createMetaFile, updateMetaFile } from '../../services/metafiles'
import { createFile, updateFile } from '../../services/files'
import socket from '../../../../core/services/routes/emitter'
import knex from '../../../../core/services/knex'
import MetaFile from '../../models/metafile'
import Folder from '../../models/folder'
import File from '../../models/file'
import Item from '../../models/item'

const route = async (req, res) => {

  if(req.if_token !== undefined && req.item && req.item.get('lock_token') !== req.if_token) {
    return res.status(403).send(null)
  }

  if(!req.item) {

    const folder = await Folder.scope({
      team: req.team
    }).where(qb => {
      qb.where('fullpath', req.parent_path)
      qb.whereNull('deleted_at')
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

    const create = req.is_metafile ? createMetaFile : createFile

    const file = await create(req, {
      source_id: 11,
      label: req.label,
      file_data: req.rawBody,
      folder
    })

    req.item = await Item.query(qb => {
      qb.where('code', file.get('code'))
    }).fetch({
      withRelated: ['folder'],
      transacting: req.trx
    })

  } else if(req.item.get('type') === 'file') {

    const file = await File.query(qb => {
      qb.where('id', req.item.get('item_id'))
    }).fetch({
      transacting: req.trx
    })

    await updateFile(req, file, {
      source_id: 11,
      file_data: req.rawBody
    })

  } else if(req.item.get('type') === 'metafile') {

    const metafile = await MetaFile.query(qb => {
      qb.where('id', req.item.get('item_id'))
    }).fetch({
      transacting: req.trx
    })

    await updateMetaFile(req, metafile, {
      source_id: 11,
      file_data: req.rawBody
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
