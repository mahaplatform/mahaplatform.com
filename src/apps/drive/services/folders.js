import { whitelist } from '../../../core/services/routes/params'
import generateCode from '../../../core/utils/generate_code'
import socket from '../../../core/services/routes/emitter'
import Folder from '../models/folder'
import Access from '../models/access'

const _getParent = async (req, params) => {
  if(params.parent) return params.parent
  if(params.parent_id) return await Folder.where({
    id: params.parent_id
  }).fetch({
    withRelated: ['accesses'],
    transacting: req.trx
  })
  return null
}

export const createFolder = async (req, params) => {

  const parent = await _getParent(req, params)

  const code = await generateCode(req, {
    table: 'drive_folders'
  })

  const folder = await Folder.forge({
    team_id: req.team.get('id'),
    code,
    fullpath: parent ? `${parent.get('fullpath')}/${params.label}` : params.label,
    parent_id: parent ? parent.get('id') : null,
    owner_id: req.user.get('id'),
    label: params.label
  }).save(null, {
    transacting: req.trx
  })

  await Access.forge({
    team_id: req.team.get('id'),
    code: folder.get('code'),
    user_id: req.user.get('id'),
    access_type_id: 1
  }).save(null, {
    transacting: req.trx
  })

  if(parent) {

    const accesses = parent.related('accesses').toArray().filter(access => {
      return access.get('user_id') !== req.user.get('id')
    })

    await Promise.mapSeries(accesses, async access => await Access.forge({
      team_id: req.team.get('id'),
      code: folder.get('code'),
      grouping: access.get('grouping'),
      group_id: access.get('group_id'),
      user_id: access.get('user_id'),
      access_type_id: access.get('access_type_id') === 1 ? 2 : access.get('access_type_id')
    }).save(null, {
      transacting: req.trx
    }))

  }

  await folder.load(['folder','accesses.user.photo','accesses.group','accesses.access_type'], {
    transacting: req.trx
  })

  await socket.refresh(req, [
    `/admin/drive/folders/${folder.related('folder').get('code') || 'drive'}`,
    `/admin/drive/files/${folder.get('code')}`,
    '/admin/drive/folders/trash'
  ])

  return folder

}

export const renameFolder = async (req, folder, params) => {

  const parent = await _getParent(req, params)

  const label = params.label || folder.get('label')

  await folder.save({
    label,
    parent_id: parent ? parent.get('id') : folder.get('parent_id'),
    fullpath: parent ? `${parent.get('fullpath')}/${label}` : label
  }, {
    patch: true,
    transacting: req.trx
  })

  await socket.refresh(req, [
    `/admin/drive/folders/${parent ? parent.get('code') : 'drive'}`,
    `/admin/drive/folders/${folder.get('code')}`
  ])

}

export const updateFolder = async (req, folder, params) => {

  await folder.save(whitelist(params, ['parent_id','label']), {
    patch: true,
    transacting: req.trx
  })

  await folder.load(['folder'], {
    transacting: req.trx
  })

  await socket.refresh(req, [
    `/admin/drive/folders/${folder.related('folder').get('code') || 'drive'}`,
    `/admin/drive/folders/${folder.get('code')}`
  ])

}

export const destroyFolder = async (req, folder) => {

  await Access.where({
    code: folder.get('code')
  }).destroy({
    transacting: req.trx
  })

  const channels = [
    `/admin/drive/folders/${folder.related('folder').get('code') || 'drive'}`,
    `/admin/drive/folders/${folder.get('code')}`,
    '/admin/drive/folders/trash'
  ]

  await folder.destroy({
    transacting: req.trx
  })

  await socket.refresh(req, channels)

}
