import MemberSerializer from '../../../../serializers/member_serializer'
import socket from '../../../../../../core/services/routes/emitter'
import knex from '../../../../../../core/services/knex'
import Member from '../../../../models/member'

const updateRoute = async (req, res) => {

  await knex('expenses_members').transacting(req.trx).where({
    project_id: req.params.project_id
  }).delete()

  const members = await Promise.map(req.body.assignments, async assignment => {

    const member = await Member.forge({
      ...assignment,
      team_id: req.team.get('id'),
      project_id: req.params.project_id,
      is_active: true
    }).save(null, {
      transacting: req.trx
    })

    return await member.load(['user.photo','project'], {
      transacting: req.trx
    })

  })

  await socket.refresh(req, [
    `/admin/expenses/projects/${req.params.project_id}`
  ])

  res.status(200).respond(members, (member) => {
    return MemberSerializer(req, member)
  })

}

export default updateRoute
