import { whitelist } from '../../../../../core/services/routes/params'
import FolderSerializer from '../../../serializers/folder_serializer'
import socket from '../../../../../core/services/routes/emitter'
import Folder from '../../../models/folder'

const updateRoute = async (req, res) => {

  const folder = await Folder.scope({
    team: req.team
  }).query(qb => {
    qb.where('code', req.params.code)
  }).fetch({
    withRelated: ['accesses.user.photo','accesses.group','accesses.access_type'],
    transacting: req.trx
  })

  if(!folder) return req.status(404).respond({
    code: 404,
    message: 'Unable to load folder'
  })

  await folder.save(whitelist(req.body, ['parent_id','label']), {
    patch: true,
    transacting: req.trx
  })

  await socket.refresh(req, [
    `/admin/drive/folders/${folder.get('parent_id') || 'drive'}`,
    `/admin/drive/folders/${folder.get('code')}`,
    '/admin/drive/folders/trash'
  ])

  res.status(200).respond(folder, (folder) => {
    return FolderSerializer(req, folder)
  })

}

export default updateRoute
