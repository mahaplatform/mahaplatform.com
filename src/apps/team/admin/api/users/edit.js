import User from '@apps/maha/models/user'

const editRoute = async (req, res) => {

  const user = await User.query(qb => {
    qb.where('team_id', req.team.get('id'))
    qb.where('id', req.params.id)
  }).fetch({
    withRelated: ['roles','groups','supervisors'],
    transacting: req.trx
  })

  if(!user) return res.status(404).respond({
    code: 404,
    message: 'Unable to load user'
  })

  await res.status(200).respond(user, {
    fields: [
      'id',
      'email_notifications_method',
      'role_ids',
      'group_ids',
      'supervisor_ids',
      'values'
    ]
  })

}

export default editRoute
