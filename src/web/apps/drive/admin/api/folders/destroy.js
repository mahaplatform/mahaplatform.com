import FolderSerializer from '../../../serializers/folder_serializer'
import socket from '../../../../../core/services/routes/emitter'
import Access from '../../../models/access'
import Folder from '../../../models/folder'

const destroyRoute = async (req, res) => {

  const folder = await Folder.scope({
    team: req.team
  }).query(qb => {
    qb.where('code', req.params.code)
  }).fetch({
    withRelated: ['folder'],
    transacting: req.trx
  })

  if(!folder) return res.status(404).respond({
    code: 404,
    message: 'Unable to load folder'
  })

  await Access.where({
    code: folder.get('code')
  }).destroy({
    transacting: req.trx
  })

  const channels = [
    `/admin/drive/folders/${folder.related('folder') ? folder.related('folder').get('code') : 'drive'}`,
    `/admin/drive/folders/${folder.get('code')}`,
    '/admin/drive/folders/trash'
  ]

  await folder.destroy({
    transacting: req.trx
  })

  await socket.refresh(req, channels)

  res.status(200).respond(folder, FolderSerializer)

}

export default destroyRoute
