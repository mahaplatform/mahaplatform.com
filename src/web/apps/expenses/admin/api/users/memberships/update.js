import knex from '../../../../../../core/services/knex'
import Member from '../../../../models/member'

const updateRoute = async (req, res) => {

  await knex('expenses_members').transacting(req.trx).where({
    user_id: req.params.user_id
  }).delete()

  await Promise.map(req.body.assignments, async assignment => {

    const member = await Member.forge({
      ...assignment,
      team_id: req.team.get('id'),
      user_id: req.params.user_id,
      is_active: true
    }).save(null, {
      transacting: req.trx
    })

    return await member.load(['user.photo','project'], {
      transacting: req.trx
    })

  })

  res.status(200).respond(true)

}

export default updateRoute
