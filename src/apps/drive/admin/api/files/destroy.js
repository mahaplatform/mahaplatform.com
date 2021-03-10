import FileSerializer from '@apps/drive/serializers/file_serializer'
import { destroyFile } from '@apps/drive/services/files'

const destroyRoute = async (req, res) => {

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

  await destroyFile(req, file)

  await res.status(200).respond(true)

}

export default destroyRoute
