import FileSerializer from '../../serializers/file_serializer'
import Version from '../../models/version'
import Access from '../../models/access'
import Folder from '../../models/folder'
import File from '../../models/file'
import Asset from '../../../maha/models/asset'
import { Resources } from '../../../../core/backframe'
import _ from 'lodash'

const beforeCreateProcessor = async (req, trx, result, options) => {

  const asset = await Asset.where({
    id: req.body.asset_id
  }).fetch({ transacting: trx })

  req.body.file_name = asset.get('original_file_name')

}

const _createVersion = async (req, trx, result, options) => {

  if(!req.body.asset_id) return

  const version = await Version.forge({
    team_id: req.team.get('id'),
    user_id: req.user.get('id'),
    file_id: req.resource.get('id'),
    asset_id: req.body.asset_id
  }).save(null, { transacting: trx })

  await req.resource.save({
    version_id: version.get('id')
  }, { patch: true, transacting: trx })

  delete req.body.asset_id

}

const _setOwnerAccess = async (req, trx, result, options) => {

  await Access.forge({
    team_id: req.team.get('id'),
    code: result.get('code'),
    user_id: req.user.get('id'),
    access_type_id: 1
  }).save(null, { transacting: trx })

}

const _inheritAccess = async (req, trx, result, options) => {

  if(!result.get('folder_id')) return

  const folder = await Folder.where({
    id: result.get('folder_id')
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

  await _createVersion(req, trx, result, options)

  await _setOwnerAccess(req, trx, result, options)

  await _inheritAccess(req, trx, result, options)

}

const beforeUpdateProcessor = async (req, trx, result, options) => {

  await _createVersion(req, trx, result, options)

}

const beforeDestroyProcessor = async (req, trx, options) => {

  await req.resource.save({
    version_id: null
  }, { patch: true, transacting: trx })

  await Access.where({
    code:req.resource.get('code')
  }).destroy({ transacting: trx })

  await Version.where({
    file_id: req.resource.get('id')
  }).destroy({ transacting: trx })

}

const defaultParams = (req, trx, options) => ({
  code: _.random(Math.pow(36,9).toString(36), Math.pow(36, 10) - 1).toString(36)
})

const channels = (req, trx, result, options) => [
  `/admin/drive/folders/${result.get('folder_id') || 'drive'}`,
  `/admin/drive/files/${result.get('code')}`,
  '/admin/drive/folders/trash'
]

const refresh = {
  create: channels,
  update: channels,
  destroy: channels
}

const fileResources = new Resources({
  afterProcessor: {
    create: afterCreateProcessor
  },
  allowedParams: ['folder_id','file_name'],
  beforeProcessor: {
    create: beforeCreateProcessor,
    update: beforeUpdateProcessor,
    destroy: beforeDestroyProcessor
  },
  defaultParams,
  refresh,
  model: File,
  path: '/files',
  primaryKey: 'code',
  serializer: FileSerializer,
  virtualParams: ['asset_id'],
  withRelated: ['current_version.asset','current_version.asset.user.photo','current_version.asset.source','versions.asset.source','versions.user','accesses.user.photo','accesses.group','accesses.access_type']
})

export default fileResources
