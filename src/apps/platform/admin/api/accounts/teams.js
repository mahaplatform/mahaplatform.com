import Account from '../../../../maha/models/account'

const teamsRoute = async (req, res, next) => {

  const account = await Account.query(qb => {
    qb.where('maha_accounts.id', req.params.id)
  }).fetch({
    withRelated: ['users.team.logo'],
    transacting: req.trx
  })

  if(!account) return res.status(404).respond({
    code: 404,
    message: 'Unable to load account'
  })

  res.status(200).respond(account.related('users'), (req, user) => {
    const team = user.related('team')
    return {
      id: team.get('id'),
      logo: team.related('logo') ? team.related('logo').get('path') : null,
      title: team.get('title')
    }
  })

}

export default teamsRoute
