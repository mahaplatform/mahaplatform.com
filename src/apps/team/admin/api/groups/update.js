import { activity } from '@core/services/routes/activities'
import { whitelist } from '@core/services/routes/params'
import GroupSerializer from '@apps/team/serializers/group_serializer'
import socket from '@core/services/routes/emitter'
import Group from '@apps/maha/models/group'

const updateRoute = async (req, res) => {

  const group = await Group.query(qb => {
    qb.where('team_id', req.team.get('id'))
    qb.where('id', req.params.id)
  }).fetch({
    withRelated: ['users.photo'],
    transacting: req.trx
  })

  if(!group) return res.status(404).respond({
    code: 404,
    message: 'Unable to load group'
  })

  await group.save(whitelist(req.body, ['title','leader_id']), {
    patch: true,
    transacting: req.trx
  })

  await activity(req, {
    story: 'updated {object}',
    object: group
  })

  await socket.refresh(req, [
    '/admin/team/groups',
    `/admin/team/groups/${group.get('id')}`
  ])

  res.status(200).respond(group, GroupSerializer)

}

export default updateRoute
