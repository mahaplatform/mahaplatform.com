import FileSerializer from '@apps/drive/serializers/file_serializer'
import File from '@apps/drive/models/file'

const showRoute = async (req, res) => {

  const file = await File.query(qb => {
    qb.where('team_id', req.team.get('id'))
    qb.where('code', req.params.code)
  }).fetch({
    withRelated: ['current_version.asset','current_version.asset.user.photo','current_version.asset','versions.asset','versions.user','accesses.user.photo','accesses.group','accesses.access_type'],
    transacting: req.trx
  })

  if(!file) return res.status(404).respond({
    code: 404,
    message: 'Unable to load file'
  })

  res.status(200).respond(file, FileSerializer)

}

export default showRoute
