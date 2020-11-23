import FileSerializer from '@apps/drive/serializers/file_serializer'
import { createFolder } from '@apps/drive/services/folders'
import { createFile } from '@apps/drive/services/files'
import Folder from '@apps/drive/models/folder'

const _createFolder = async (req, { parent, path }) => {

  const folder = await Folder.query(qb => {
    qb.where('team_id', req.team.get('id'))
    qb.where('parent_id', parent ? parent.get('id') : null)
    qb.where('label', path[0])
    qb.whereNull('deleted_at')
  }).fetch({
    transacting: req.trx
  }) || await createFolder(req, {
    parent,
    label: path[0]
  })

  return path.length === 1 ? folder : await _createFolder(req, {
    parent: folder,
    path: path.slice(1)
  })

}

const uploadRoute = async (req, res) => {

  const files = await Promise.mapSeries(req.body.files, async(item) => {

    const parent = item.folder_code ? await Folder.query(qb => {
      qb.where('team_id', req.team.get('id'))
      qb.where('code', item.folder_code)
    }).fetch({
      transacting: req.trx
    }) : null

    const path = item.path.split('/').slice(0,-1)

    const folder = path.length > 0 ? await _createFolder(req, {
      parent,
      path
    }) : parent

    const file = await createFile(req, {
      asset_id: item.asset_id,
      folder
    })

    await file.load(['folder', 'current_version.asset','current_version.asset.user.photo','current_version.asset','versions.asset','versions.user','accesses.user.photo','accesses.group','accesses.access_type'], {
      transacting: req.trx
    })

    return file

  })

  res.status(200).respond(files, FileSerializer)

}

export default uploadRoute
