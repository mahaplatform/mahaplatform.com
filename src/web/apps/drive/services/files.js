import { whitelist } from '../../../core/services/routes/params'
import generateCode from '../../../core/utils/generate_code'
import socket from '../../../core/services/routes/emitter'
import Asset from '../../maha/models/asset'
import Version from '../models/version'
import Folder from '../models/folder'
import Access from '../models/access'
import File from '../models/file'

const _getFolder = async (req, params) => {
  if(params.folder) return params.folder
  if(params.folder_id) return await Folder.where({
    id: params.folder_id
  }).fetch({
    withRelated: ['accesses'],
    transacting: req.trx
  })
  return null
}

const _getAsset = async (req, params) => {
  if(params.asset) return params.asset
  if(params.asset_id) return await Asset.where({
    id: params.asset_id
  }).fetch({
    transacting: req.trx
  })
  return null
}

export const createFile = async (req, params) => {

  const parent = await _getFolder(req, params)

  const asset = await _getAsset(req, params)

  const file = await File.forge({
    team_id: req.team.get('id'),
    code: generateCode(),
    label: asset.get('original_file_name'),
    fullpath: parent ? `${parent.get('fullpath')}/${asset.get('original_file_name')}` : asset.get('original_file_name'),
    folder_id: parent.get('id'),
    owner_id: req.user.get('id')
  }).save(null, {
    transacting: req.trx
  })

  const version = await Version.forge({
    team_id: req.team.get('id'),
    user_id: req.user.get('id'),
    file_id: file.get('id'),
    asset_id: asset.get('id')
  }).save(null, {
    transacting: req.trx
  })

  await file.save({
    version_id: version.get('id')
  }, {
    patch: true,
    transacting: req.trx
  })

  await Access.forge({
    team_id: req.team.get('id'),
    code: file.get('code'),
    user_id: req.user.get('id'),
    access_type_id: 1
  }).save(null, {
    transacting: req.trx
  })

  if(parent) {

    const accesses = parent.related('accesses').toArray().filter(access => {
      return access.get('user_id') !== req.user.get('id')
    })

    await Promise.map(accesses, async access => await Access.forge({
      team_id: req.team.get('id'),
      code: file.get('code'),
      is_everyone: access.get('is_everyone'),
      user_id: access.get('user_id'),
      group_id: access.get('group_id'),
      access_type_id: access.get('access_type_id') === 1 ? 2 : access.get('access_type_id')
    }).save(null, {
      transacting: req.trx
    }))

  }

  await socket.refresh(req, [
    `/admin/drive/folders/${parent ? parent.get('code') : 'drive'}`,
    `/admin/drive/files/${file.get('code')}`,
    '/admin/drive/folders/trash'
  ])

  return file

}

export const updateFile = async (req, file, params) => {

  if(params.folder_id || req.body.label) {
    await file.save(whitelist(params, ['folder_id','label']), {
      patch: true,
      transacting: req.trx
    })
  }

  if(params.asset_id) {
    const version = await Version.forge({
      team_id: req.team.get('id'),
      user_id: req.user.get('id'),
      file_id: file.get('id'),
      asset_id: params.asset_id
    }).save(null, {
      transacting: req.trx
    })

    await file.save({
      version_id: version.get('id')
    }, {
      patch: true,
      transacting: req.trx
    })
  }

  await file.load(['folder','current_version.asset','current_version.asset.user.photo','current_version.asset.source','versions.asset.source','versions.user','accesses.user.photo','accesses.group','accesses.access_type'], {
    transacting: req.trx
  })

  await socket.refresh(req, [
    `/admin/drive/folders/${file.related('folder').get('code') || 'drive'}`,
    `/admin/drive/files/${file.get('code')}`,
    '/admin/drive/folders/trash'
  ])

}

export const renameFile = async (req, file, params) => {

  const folder_id = params.folder_id || file.get('folder_id')

  const folder = folder_id ? await Folder.where(qb => {
    qb.where('id', folder_id)
  }).fetch({
    transacting: req.trx
  }) : null

  await file.save({
    label: params.label,
    folder_id: folder ? folder.get('id') : null,
    fullpath: folder ? `${folder.get('fullpath')}/${params.label}` : params.label
  }, {
    patch: true,
    transacting: req.trx
  })

  await socket.refresh(req, [
    `/admin/drive/folders/${folder ? folder.get('code') : 'drive'}`,
    `/admin/drive/folders/${file.get('code')}`
  ])

}

export const destroyFile = async (req, file) => {

  const dotfile = await _getDotFile(req, file)

  await _destroyFile(req, file)

  if(!dotfile) return

  await _destroyFile(req, dotfile)

}

export const _destroyFile = async (req, file) => {

  await Access.where({
    code: file.get('code')
  }).destroy({
    transacting: req.trx
  })

  await file.save({
    version_id: null
  }, {
    patch: true,
    transacting: req.trx
  })

  await Version.where({
    file_id: file.get('id')
  }).destroy({
    transacting: req.trx
  })

  await file.load(['folder'], {
    transacting: req.trx
  })

  const channels = [
    `/admin/drive/folders/${file.related('folder') ? file.related('folder').get('code') : 'drive'}`,
    `/admin/drive/files/${file.get('code')}`,
    '/admin/drive/folders/trash'
  ]

  await file.destroy({
    transacting: req.trx
  })

  await socket.refresh(req, channels)

}

const _getDotFile = async (req, file) => {

  return await File.scope({
    team: req.team
  }).query(qb => {
    qb.where('folder_id', file.get('folder_id'))
    qb.where('label', `._${file.get('label')}`)
  }).fetch({
    transacting: req.trx
  })

}
