import Profile from '@apps/maha/models/profile'

const checkRoute = async (req, res) => {

  const profile = await Profile.query(qb => {
    qb.where('account_id', req.account.get('id'))
    qb.where('source', req.params.source)
  }).fetch({
    transacting: req.trx
  })

  const data = profile !== null

  res.status(200).respond(data)

}

export default checkRoute
