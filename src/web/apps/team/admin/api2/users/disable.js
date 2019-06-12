import User from '../../../../maha/models/user'

const disableRoute = async (req, res) => {

  const user = await User.query(qb => {
    qb.where('team_id', req.team.get('id'))
    qb.where('id', req.params.id)
  }).fetch({
    transacting: req.trx
  })

  if(!user) return req.status(404).respond({
    code: 404,
    message: 'Unable to load user'
  })

  await user.save({
    is_active: false
  }, {
    patch: true,
    transacting: req.trx
  })

  res.status(200).respond(true)

}

export default disableRoute
