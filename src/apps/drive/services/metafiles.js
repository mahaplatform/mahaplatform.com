import { createAsset, updateAsset } from '../../maha/services/assets'
import { whitelist } from '../../../core/services/routes/params'
import generateCode from '../../../core/utils/generate_code'
import Asset from '../../maha/models/asset'
import MetaFile from '../models/metafile'
import Access from '../models/access'
import Folder from '../models/folder'

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
      source_id: params.source_id || 1,
      file_data: params.file_data,
      file_size: params.file_data.length,
      file_name: params.label
    })
  }
  return null
}

export const createMetaFile = async (req, params) => {

  const parent = await _getFolder(req, params)

  const asset = await _getAsset(req, params)

  const label = asset ? asset.get('original_file_name') : params.label

  const code = await generateCode(req, {
    table: 'drive_metafiles'
  })

  const file = await MetaFile.forge({
    team_id: req.team.get('id'),
    owner_id: req.user.get('id'),
    folder_id: parent ? parent.get('id') : null,
    asset_id: asset ? asset.get('id') : null,
    code,
    label,
    fullpath: parent ? `${parent.get('fullpath')}/${label}` : label
  }).save(null, {
    transacting: req.trx
  })

  await Access.forge({
    team_id: req.team.get('id'),
    user_id: req.user.get('id'),
    code: file.get('code'),
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
      grouping: access.get('grouping'),
      group_id: access.get('group_id'),
      user_id: access.get('user_id'),
      access_type_id: access.get('access_type_id') === 1 ? 2 : access.get('access_type_id')
    }).save(null, {
      transacting: req.trx
    }))

  }

  return file

}

export const renameMetaFile = async (req, metafile, params) => {

  const folder = await _getFolder(params)

  const label = params.label || metafile.get('label')

  await metafile.save({
    label,
    folder_id: folder ? folder.get('id') : metafile.get('folder_id'),
    fullpath: folder ? `${folder.get('fullpath')}/${label}` : label
  }, {
    patch: true,
    transacting: req.trx
  })

}

export const updateMetaFile = async (req, metafile, params) => {

  if(params.folder_id || req.body.label) {
    await metafile.save(whitelist(params, ['folder_id','label']), {
      patch: true,
      transacting: req.trx
    })
  }

  if(params.file_data) {

    const asset = await _getAsset(req, {
      asset_id: metafile.get('asset_id')
    })

    await updateAsset(req, asset, {
      file_data: params.file_data
    })

  }

}

export const destroyMetaFile = async (req, file) => {

  await file.destroy({
    transacting: req.trx
  })

}
