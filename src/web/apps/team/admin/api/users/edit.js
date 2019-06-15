import User from '../../../../maha/models/user'

const showRoute = async (req, res) => {

  const user = await User.scope({
    team: req.team
  }).query(qb => {
    qb.where('id', req.params.id)
  }).fetch({
    withRelated: ['roles','groups','supervisors'],
    transacting: req.trx
  })

  if(!user) return req.status(404).respond({
    code: 404,
    message: 'Unable to load user'
  })

  res.status(200).respond(user, {
    fields: [
      'id',
      'first_name',
      'last_name',
      'email',
      'secondary_email',
      'email_notifications_method',
      'photo_id',
      'role_ids',
      'group_ids',
      'supervisor_ids',
      'values'
    ]
  })

}

export default showRoute
