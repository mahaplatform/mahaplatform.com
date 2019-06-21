import FileSerializer from '../../../serializers/file_serializer'
import { destroyFile } from '../../../services/files'

const destroyRoute = async (req, res) => {

  const file = await File.scope({
    team: req.team
  }).query(qb => {
    qb.where('code', req.params.code)
  }).fetch({
    transacting: req.trx
  })

  if(!file) return res.status(404).respond({
    code: 404,
    message: 'Unable to load file'
  })

  await destroyFile(req, file)

  res.status(200).respond(file, FileSerializer)

}

export default destroyRoute
