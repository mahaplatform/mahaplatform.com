import { whitelist } from '../../../../../core/services/routes/params'
import FileSerializer from '../../../serializers/file_serializer'
import socket from '../../../../../core/services/routes/emitter'
import Version from '../../../models/version'
import File from '../../../models/file'

const updateRoute = async (req, res) => {

  const file = await File.scope({
    team: req.team
  }).query(qb => {
    qb.where('code', req.params.code)
  }).fetch({
    transacting: req.trx
  })

  if(!file) return req.status(404).respond({
    code: 404,
    message: 'Unable to load file'
  })

  if(req.body.folder_id || req.body.label) {
    await file.save(whitelist(req.body, ['folder_id','label']), {
      patch: true,
      transacting: req.trx
    })
  }

  if(req.body.asset_id) {
    const version = await Version.forge({
      team_id: req.team.get('id'),
      user_id: req.user.get('id'),
      file_id: file.get('id'),
      asset_id: req.body.asset_id
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

  await file.load(['current_version.asset','current_version.asset.user.photo','current_version.asset.source','versions.asset.source','versions.user','accesses.user.photo','accesses.group','accesses.access_type'], {
    transacting: req.trx
  })

  await socket.refresh(req, [
    `/admin/drive/folders/${file.get('folder_id') || 'drive'}`,
    `/admin/drive/files/${file.get('code')}`,
    '/admin/drive/folders/trash'
  ])

  res.status(200).respond(file, FileSerializer)

}

export default updateRoute
