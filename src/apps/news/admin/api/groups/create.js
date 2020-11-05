import { whitelist } from '@core/services/routes/params'
import GroupSerializer from '../../../serializers/group_serializer'
import socket from '@core/services/routes/emitter'
import { updateMembers } from '../../../services/groups'
import Group from '../../../models/group'

const createRoute = async (req, res) => {

  const group = await Group.forge({
    team_id: req.team.get('id'),
    owner_id: req.user.get('id'),
    ...whitelist(req.body, ['logo_id','title'])
  }).save(null, {
    transacting: req.trx
  })

  await updateMembers(req, {
    group,
    members: req.body.members
  })

  await socket.refresh(req, [
    '/admin/news/groups',
    '/admin/news'
  ])

  res.status(200).respond(group, GroupSerializer)

}

export default createRoute
