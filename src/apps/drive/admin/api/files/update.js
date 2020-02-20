import FileSerializer from '../../../serializers/file_serializer'
import { updateFile } from '../../../services/files'
import File from '../../../models/file'

const updateRoute = async (req, res) => {

  const file = await File.query(qb => {
    qb.where('team_id', req.team.get('id'))
    qb.where('code', req.params.code)
  }).fetch({
    transacting: req.trx
  })

  if(!file) return res.status(404).respond({
    code: 404,
    message: 'Unable to load file'
  })

  await updateFile(req, file, req.body)

  res.status(200).respond(file, FileSerializer)

}

export default updateRoute
