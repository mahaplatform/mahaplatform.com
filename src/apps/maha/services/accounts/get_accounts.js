import Account from '@apps/maha/models/account'

const getAccounts = async (req, params) => {

  const { filter, page } = params

  return await Account.filterFetch({
    scope: (qb) => {
      qb.select(req.trx.raw('distinct on (maha_accounts.id,maha_accounts.last_name) maha_accounts.*'))
      qb.joinRaw('inner join maha_users on maha_users.account_id=maha_accounts.id and maha_users.is_active=true')
      qb.joinRaw('inner join maha_teams on maha_teams.id=maha_users.team_id and maha_teams.is_active=true')
      qb.leftJoin('maha_users_roles', 'maha_users_roles.user_id','maha_users.id')
      qb.leftJoin('maha_roles_apps', 'maha_roles_apps.role_id','maha_users_roles.role_id')
    },
    aliases: {
      app_id: 'maha_roles_apps.app_id',
      right_id: 'maha_roles_rights.right_id',
      team_id: 'maha_users.team_id'
    },
    filter: {
      params: filter,
      search: ['first_name','last_name','email']
    },
    sort: {
      defaults: 'last_name',
      allowed: ['last_name']
    },
    page,
    withRelated: ['photo'],
    transacting: req.trx
  })

}

export default getAccounts
