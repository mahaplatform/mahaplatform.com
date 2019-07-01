import generateCode from '../../../core/utils/generate_code'
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

export const createMetaFile = async (req, params) => {

  const parent = await _getFolder(req, params)

  const file = await MetaFile.forge({
    team_id: params.team_id,
    code: generateCode(),
    label: params.label,
    fullpath: parent ? `${parent.get('fullpath')}/${params.label}` :params.label,
    folder_id: parent.get('id'),
    file_size: params.file_size,
    contents: params.contents
  }).save(null, {
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

  return file

}

export const destroyMetaFile = async (req, file) => {

  await file.destroy({
    transacting: req.trx
  })

}
