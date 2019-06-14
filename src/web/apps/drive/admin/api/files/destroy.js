import FileSerializer from '../../../serializers/file_serializer'
import socket from '../../../../../core/services/routes/emitter'
import Version from '../../../models/version'
import Access from '../../../models/access'
import File from '../../../models/file'

const destroyRoute = async (req, res) => {

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

  await Access.where({
    code: file.get('code')
  }).destroy({
    transacting: req.trx
  })

  await Version.where({
    file_id: req.resource.get('id')
  }).destroy({
    transacting: req.trx
  })

  const channels = [
    `/admin/drive/folders/${file.get('folder_id') || 'drive'}`,
    `/admin/drive/files/${file.get('code')}`,
    '/admin/drive/folders/trash'
  ]

  await file.destroy({
    transacting: req.trx
  })

  await socket.refresh(req, channels)

  res.status(200).respond(file, (file) => {
    return FileSerializer(req, file)
  })

}

export default destroyRoute
