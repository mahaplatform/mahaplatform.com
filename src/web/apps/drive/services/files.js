import generateCode from '../../../core/utils/generate_code'
import socket from '../../../core/services/routes/emitter'
import Asset from '../../maha/models/asset'
import Version from '../models/version'
import Folder from '../models/folder'
import Access from '../models/access'
import File from '../models/file'

export const createFile = async (req, params) => {

  const parent = params.folder_id ? await Folder.where({
    id: params.folder_id
  }).fetch({
    withRelated: ['accesses'],
    transacting: req.trx
  }) : null

  const asset = await Asset.where({
    id: params.asset_id
  }).fetch({
    transacting: req.trx
  })

  const file = await File.forge({
    team_id: req.team.get('id'),
    code: generateCode(),
    label: asset.get('original_file_name'),
    fullpath: parent ? `${parent.get('fullpath')}/${asset.get('original_file_name')}` : asset.get('original_file_name'),
    folder_id: params.folder_id
  }).save(null, {
    transacting: req.trx
  })

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

  await Access.forge({
    team_id: req.team.get('id'),
    code: file.get('code'),
    user_id: req.user.get('id'),
    access_type_id: 1
  }).save(null, {
    transacting: req.trx
  })

  if(parent) {
    await Promise.map(parent.related('accesses').toArray().filter(access => {
      return access.get('user_id') !== req.user.get('id')
    }), async access => await Access.forge({
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

  await file.load(['current_version.asset','current_version.asset.user.photo','current_version.asset.source','versions.asset.source','versions.user','accesses.user.photo','accesses.group','accesses.access_type'], {
    transacting: req.trx
  })

  await socket.refresh(req, [
    `/admin/drive/folders/${file.get('folder_id') || 'drive'}`,
    `/admin/drive/files/${file.get('code')}`,
    '/admin/drive/folders/trash'
  ])

}
