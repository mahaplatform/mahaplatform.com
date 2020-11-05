import FolderSerializer from '@apps/drive/serializers/folder_serializer'
import Folder from '@apps/drive/models/folder'

const showRoute = async (req, res) => {

  const folder = await Folder.query(qb => {
    qb.where('team_id', req.team.get('id'))
    qb.where('code', req.params.code)
  }).fetch({
    withRelated: ['accesses.user.photo','accesses.group','accesses.access_type'],
    transacting: req.trx
  })

  if(!folder) return res.status(404).respond({
    code: 404,
    message: 'Unable to load folder'
  })

  res.status(200).respond(folder, FolderSerializer)

}

export default showRoute
