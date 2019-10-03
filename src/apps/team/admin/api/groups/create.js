import GroupSerializer from '../../../serializers/group_serializer'
import { activity } from '../../../../../web/core/services/routes/activities'
import { whitelist } from '../../../../../web/core/services/routes/params'
import socket from '../../../../../web/core/services/routes/emitter'
import Group from '../../../../maha/models/group'

const createRoute = async (req, res) => {

  const group = await Group.forge({
    team_id: req.team.get('id'),
    ...whitelist(req.body, ['title','leader_id'])
  }).save(null, {
    transacting: req.trx
  })

  await activity(req, {
    story: 'created {object}',
    object: group
  })

  await socket.refresh(req, [
    '/admin/team/groups'
  ])

  res.status(200).respond(group, GroupSerializer)

}

export default createRoute
