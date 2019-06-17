import FolderSerializer from '../../../serializers/folder_serializer'
import generateCode from '../../../../../core/utils/generate_code'
import socket from '../../../../../core/services/routes/emitter'
import Folder from '../../../models/folder'
import Access from '../../../models/access'

const createRoute = async (req, res) => {

  const parent = req.body.parent_id ? await Folder.where({
    id: req.body.parent_id
  }).fetch({
    withRelated: ['accesses'],
    transacting: req.trx
  }) : null

  const folder = await Folder.forge({
    team_id: req.team.get('id'),
    code: generateCode(),
    fullpath: parent ? `${parent.get('fullpath')}/${req.body.label}` : req.body.label,
    parent_id: req.body.parent_id,
    label: req.body.label
  }).save(null, {
    transacting: req.trx
  })

  await Access.forge({
    team_id: req.team.get('id'),
    code: folder.get('code'),
    user_id: req.user.get('id'),
    access_type_id: 1
  }).save(null, {
    transacting: req.trx
  })

  if(parent) {
    await Promise.map(parent.related('accesses').toArray().filter(access => {
      return access.get('user_id') !== req.user.get('id')
    }), async access => await Access.forge({
      team_id: req.team.get('id'),
      code: folder.get('code'),
      is_everyone: access.get('is_everyone'),
      user_id: access.get('user_id'),
      group_id: access.get('group_id'),
      access_type_id: access.get('access_type_id') === 1 ? 2 : access.get('access_type_id')
    }).save(null, {
      transacting: req.trx
    }))
  }

  folder.load(['accesses.user.photo','accesses.group','accesses.access_type'], {
    transacting: req.trx
  })

  await socket.refresh(req, [
    `/admin/drive/folders/${folder.get('parent_id') || 'drive'}`,
    `/admin/drive/files/${folder.get('code')}`,
    '/admin/drive/folders/trash'
  ])

  res.status(200).respond(folder, FolderSerializer)

}

export default createRoute
