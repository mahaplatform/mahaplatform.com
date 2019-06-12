import { updateRelated } from '../../../../../../core/services/routes/relations'
import socket from '../../../../../../core/services/routes/emitter'
import Group from '../../../../../maha/models/group'

const updateRoute = async (req, res) => {

  const group = await Group.query(qb => {
    qb.where('team_id', req.team.get('id'))
    qb.where('id', req.params.id)
  }).fetch({
    transacting: req.trx
  })

  if(!group) return req.status(404).respond({
    code: 404,
    message: 'Unable to load group'
  })

  await updateRelated(req, {
    object: group,
    related: 'users',
    table: 'maha_users_groups',
    ids: req.body.assignments.map(assignment => assignment.user_id),
    primary_key: 'group_id',
    foreign_key: 'user_id'
  })

  await socket.refresh(req, [
    `/admin/team/groups/${req.params.id}`
  ])

  res.status(200).respond(true)

}

export default updateRoute
