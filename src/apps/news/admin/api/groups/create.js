import { whitelist } from '../../../../../core/services/routes/params'
import GroupSerializer from '../../../serializers/group_serializer'
import socket from '../../../../../core/services/routes/emitter'
import Member from '../../../models/member'
import Group from '../../../models/group'

const createRoute = async (req, res) => {

  const group = await Group.forge({
    team_id: req.team.get('id'),
    owner_id: req.user.get('id'),
    title: req.body.title
  }).save(null, {
    transacting: req.trx
  })

  if(req.body.members) {
    await Promise.map(req.body.members, async (member) => {
      await Member.forge({
        team_id: req.team.get('id'),
        news_group_id: group.get('id'),
        ...member
      }).save(null, {
        transacting: req.trx
      })
    })
  }

  await socket.refresh(req, [
    '/admin/news/groups',
    '/admin/news'
  ])

  res.status(200).respond(group, GroupSerializer)

}

export default createRoute
