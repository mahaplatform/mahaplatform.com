import FolderSerializer from '../../../serializers/folder_serializer'
import { updateFolder } from '../../../services/folders'
import Folder from '../../../models/folder'

const updateRoute = async (req, res) => {

  const folder = await Folder.scope(qb => {
    qb.where('team_id', req.team.get('id'))
  }).query(qb => {
    qb.where('code', req.params.code)
  }).fetch({
    withRelated: ['accesses.user.photo','accesses.group','accesses.access_type'],
    transacting: req.trx
  })

  if(!folder) return res.status(404).respond({
    code: 404,
    message: 'Unable to load folder'
  })

  await updateFolder(req, folder, req.body)

  res.status(200).respond(folder, FolderSerializer)

}

export default updateRoute
