import Account from '@apps/maha/models/account'
import Team from '@apps/maha/models/team'

const availableRoute = async (req, res, next) => {

  const account = await Account.query(qb => {
    qb.where('id', req.params.account_id)
  }).fetch({
    transacting: req.trx
  })

  if(!account) return res.status(404).respond({
    code: 404,
    message: 'Unable to load account'
  })

  const teams = await Team.filterFetch({
    scope: (qb) => {
      qb.joinRaw('left join maha_users on maha_users.team_id=maha_teams.id and maha_users.account_id=?', account.get('id'))
      qb.whereNull('maha_users.id')
    },
    filter: {
      params: req.query.$filter
    },
    sort: {
      params: req.query.$sort,
      defaults: 'title',
      allowed: ['title']
    },
    page: req.query.$page,
    withRelated: ['logo'],
    transacting: req.trx
  })

  await res.status(200).respond(teams, (req, team) => ({
    id: team.get('id'),
    logo: team.related('logo') ? team.related('logo').get('path') : null,
    title: team.get('title')
  }))

}

export default availableRoute
