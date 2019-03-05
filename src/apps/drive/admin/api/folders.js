import FolderSerializer from '../../serializers/folder_serializer'
import Folder from '../../models/folder'
import Access from '../../models/access'
import { Resources } from 'maha'
import _ from 'lodash'

const _setOwnerAccess = async (req, trx, result, options) => {

  await Access.forge({
    team_id: req.team.get('id'),
    code: result.get('code'),
    user_id: req.user.get('id'),
    access_type_id: 1
  }).save(null, { transacting: trx })

}

const _inheritAccess = async (req, trx, result, options) => {

  if(result.get('parent_id') === null) return

  const folder = await Folder.where({
    id: result.get('parent_id')
  }).fetch({
    withRelated: ['accesses'],
    transacting: trx
  })

  await Promise.map(folder.related('accesses').toArray(), async access => {

    if(access.get('user_id') === req.user.get('id')) return

    await Access.forge({
      team_id: req.team.get('id'),
      code: result.get('code'),
      is_everyone: access.get('is_everyone'),
      user_id: access.get('user_id'),
      group_id: access.get('group_id'),
      access_type_id: access.get('access_type_id') === 1 ? 2 : access.get('access_type_id')
    }).save(null, { transacting: trx })

  })

}

const afterCreateProcessor = async (req, trx, result, options) => {

  await _setOwnerAccess(req, trx, result, options)

  await _inheritAccess(req, trx, result, options)

}

const beforeDestroyProcessor = async (req, trx, options) => {

  await Access.where({
    code:  req.resource.get('code')
  }).destroy({ transacting: trx })

}

const defaultParams = (req, trx, options) => ({
  code: _.random(Math.pow(36,9).toString(36), Math.pow(36, 10) - 1).toString(36)
})

const channels = (req, trx, result, options) => [
  `/admin/drive/folders/${result.id}`,
  `/admin/drive/folders/${result.get('parent_id') || 'drive'}`,
  '/admin/drive/folders/trash'
]


const refresh = {
  create: channels,
  update: channels,
  destroy: channels
}

const folderResources = new Resources({
  allowedParams: ['label','parent_id'],
  afterProcessor: { create: afterCreateProcessor },
  beforeProcessor: { destroy: beforeDestroyProcessor },
  defaultParams,
  refresh,
  model: Folder,
  path: '/folders',
  primaryKey: 'code',
  serializer: FolderSerializer,
  withRelated: ['accesses.user.photo','accesses.group','accesses.access_type']
})

export default folderResources
