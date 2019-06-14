import FileSerializer from '../../../serializers/file_serializer'
import File from '../../../models/file'

const showRoute = async (req, res) => {

  const file = await File.scope({
    team: req.team
  }).query(qb => {
    qb.where('code', req.params.code)
  }).fetch({
    withRelated: ['current_version.asset','current_version.asset.user.photo','current_version.asset.source','versions.asset.source','versions.user','accesses.user.photo','accesses.group','accesses.access_type'],
    transacting: req.trx
  })

  if(!file) return req.status(404).respond({
    code: 404,
    message: 'Unable to load file'
  })

  res.status(200).respond(file, (file) => {
    return FileSerializer(req, file)
  })

}

export default showRoute
