import { createAsset } from '@apps/maha/services/assets'
import { whitelist } from '@core/services/routes/params'
import generateCode from '@core/utils/generate_code'
import socket from '@core/services/routes/emitter'
import Asset from '@apps/maha/models/asset'
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
  if(params.file_data) {
    return await createAsset(req, {
      team_id: req.team.get('id'),
      user_id: req.user.get('id'),
      source: params.source || 'device',
      file_data: params.file_data.length === 0 ? null : params.file_data,
      file_size: params.file_data.length === 0 ? 0 : null,
      file_name: params.label
    })
  }
  return null
}

export const createFile = async (req, params) => {

  const parent = await _getFolder(req, params)

  const asset = await _getAsset(req, params)

  const label = asset ? asset.get('original_file_name') : params.label

  const code = await generateCode(req, {
    table: 'drive_files'
  })

  const file = await File.forge({
    team_id: req.team.get('id'),
    code,
    label,
    fullpath: parent ? `${parent.get('fullpath')}/${label}` : label,
    folder_id: parent ? parent.get('id') : null,
    owner_id: req.user.get('id')
  }).save(null, {
    transacting: req.trx
  })

  if(asset) {

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

  }

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
      grouping_id: access.get('grouping_id'),
      group_id: access.get('group_id'),
      user_id: access.get('user_id'),
      access_type_id: access.get('access_type_id') === 1 ? 2 : access.get('access_type_id')
    }).save(null, {
      transacting: req.trx
    }))

  }

  await socket.refresh(req, [
    `/admin/drive/folders/${parent ? parent.get('code') : 'drive'}`,
    `/admin/drive/files/${file.get('code')}`
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

  const asset = await _getAsset(req, {
    label: file.get('label'),
    ...params
  })

  if(asset) {

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

  }

  await file.load(['folder','current_version.asset','current_version.asset.user.photo','current_version.asset','versions.asset','versions.user','accesses.user.photo','accesses.group','accesses.access_type'], {
    transacting: req.trx
  })

  await socket.refresh(req, [
    `/admin/drive/folders/${file.related('folder').get('code') || 'drive'}`,
    `/admin/drive/files/${file.get('code')}`
  ])

}

export const renameFile = async (req, file, params) => {

  const folder = await _getFolder(req, params)

  const label = params.label || file.get('label')

  await file.save({
    label,
    folder_id: folder ? folder.get('id') : file.get('folder_id'),
    fullpath: folder ? `${folder.get('fullpath')}/${label}` : label
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

  if(file.get('version_id')) {

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

  }

  await file.load(['folder'], {
    transacting: req.trx
  })

  const channels = [
    `/admin/drive/folders/${file.related('folder') ? file.related('folder').get('code') : 'drive'}`,
    `/admin/drive/files/${file.get('code')}`
  ]

  await file.destroy({
    transacting: req.trx
  })

  await socket.refresh(req, channels)

}

const _getDotFile = async (req, file) => {

  return await File.query(qb => {
    qb.where('team_id', req.team.get('id'))
    qb.where('folder_id', file.get('folder_id'))
    qb.where('label', `._${file.get('label')}`)
  }).fetch({
    transacting: req.trx
  })

}
