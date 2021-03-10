import Account from '@apps/maha/models/account'

const listRoute = async (req, res, next) => {

  const account = await Account.query(qb => {
    qb.where('id', req.params.account_id)
  }).fetch({
    withRelated: ['users.team.logo'],
    transacting: req.trx
  })

  if(!account) return res.status(404).respond({
    code: 404,
    message: 'Unable to load account'
  })

  await res.status(200).respond(account.related('users'), (req, user) => {
    const team = user.related('team')
    return {
      id: team.get('id'),
      logo: team.related('logo') ? team.related('logo').get('path') : null,
      title: team.get('title')
    }
  })

}

export default listRoute
