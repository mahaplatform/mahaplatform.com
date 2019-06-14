import { activity } from '../../../../../core/services/routes/activities'
import { whitelist } from '../../../../../core/services/routes/params'
import GroupSerializer from '../../../serializers/group_serializer'
import socket from '../../../../../core/services/routes/emitter'
import Group from '../../../../maha/models/group'

const updateRoute = async (req, res) => {

  const group = await Group.scope({
    team: req.team
  }).query(qb => {
    qb.where('id', req.params.id)
  }).fetch({
    withRelated: ['users.photo'],
    transacting: req.trx
  })

  if(!group) return req.status(404).respond({
    code: 404,
    message: 'Unable to load group'
  })

  await group.save(whitelist(req.body, ['title']), {
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

  res.status(200).respond(group, (group) => {
    return GroupSerializer(req, group)
  })

}

export default updateRoute
