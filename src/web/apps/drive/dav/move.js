import { createMetaFile, renameMetaFile, destroyMetaFile } from '../services/metafiles'
import { renameFile, updateFile } from '../services/files'
import socket from '../../../core/services/routes/emitter'
import { createAsset } from '../../maha/services/assets'
import { renameFolder } from '../services/folders'
import MetaFile from '../models/metafile'
import Folder from '../models/folder'
import File from '../models/file'
import path from 'path'
import _ from 'lodash'
import URL from 'url'

const route = async (req, res) => {

  const { protocol, host } = URL.parse(req.headers.destination)
  const destination = decodeURI(req.headers.destination.replace(`${protocol}//${host}/dav/${req.team.get('subdomain')}/`, ''))
  const fullpath = destination.split('/')
  const label = fullpath.slice(-1)[0]
  const parent_path = fullpath.slice(0,-1).join('/')
  const is_metafile = _.includes(['._','~$','~%'], label.substr(0,2)) || _.includes(['.DS_Store'], label) || path.extname(label) === '.tmp'

  const parent = await Folder.where(qb => {
    qb.where('fullpath', parent_path)
  }).fetch({
    transacting: req.trx
  })

  if(req.item.get('type') === 'file') {

    const file = await File.query(qb => {
      qb.where('id', req.item.get('item_id'))
    }).fetch({
      transacting: req.trx
    })

    if(!is_metafile) {

      await renameFile(req, file, {
        label,
        folder_id: parent ? parent.get('id') : null
      })

    } else {

      await createMetaFile(req, {
        team_id: req.team.get('id'),
        label,
        folder: parent,
        file_size: req.item.get('file_size'),
        contents: ''
      })

    }

  } else if(req.item.get('type') === 'metafile') {

    const metafile = await MetaFile.query(qb => {
      qb.where('id', req.item.get('item_id'))
    }).fetch({
      transacting: req.trx
    })

    if(!is_metafile) {

      const file = await File.query(qb => {
        qb.where('fullpath', destination)
      }).fetch({
        transacting: req.trx
      })

      const asset = await createAsset(req, {
        team_id: req.team.get('id'),
        user_id: req.user.get('id'),
        source_id: 1,
        content_type: metafile.get('content_type'),
        file_data: metafile.get('content'),
        file_size: metafile.get('file_size'),
        file_name: label
      })

      await updateFile(req, file, {
        asset_id: asset.get('id')
      })

      await destroyMetaFile(req, metafile)

    } else {

      await renameMetaFile(req, metafile, {
        label,
        folder_id: parent ? parent.get('id') : null
      })

    }

  } else {

    const folder = await Folder.query(qb => {
      qb.where('id', req.item.get('item_id'))
    }).fetch({
      transacting: req.trx
    })

    await renameFolder(req, folder, {
      label,
      parent_id: parent ? parent.get('id') : null
    })

  }

  await req.item.load(['folder'], {
    transacting: req.trx
  })

  await socket.refresh(req, [
    `/admin/drive/folders/${req.item.related('folder').get('code') ||  'drive'}`
  ])

  res.status(200).send(null)

}

export default route
