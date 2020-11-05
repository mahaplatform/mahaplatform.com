import UserSerializer from '../../../../serializers/user_serializer'
import User from '@apps/maha/models/user'

const listRoute = async (req, res) => {

  const users = await User.filterFetch({
    scope: (qb) => {
      qb.innerJoin('maha_users_groups', 'maha_users_groups.user_id', 'maha_users.id')
      qb.where('maha_users_groups.group_id', req.params.id)
      qb.where('team_id', req.team.get('id'))
    },
    filter: {
      params: req.query.$filter,
      search: ['first_name','last_name','email']
    },
    sort: {
      params: req.query.$sort,
      defaults: 'last_name'
    },
    page: req.query.$page,
    withRelated: ['photo'],
    transacting: req.trx
  })

  res.status(200).respond(users, (req, user) => ({
    user: UserSerializer(req, user)
  }))

}

export default listRoute
