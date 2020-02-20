import UserTypeSerializer from '../../../serializers/user_type_serializer'
import UserType from '../../../../maha/models/user_type'

const listRoute = async (req, res) => {

  const user_types = await UserType.filterFetch({
    scope: (qb) => {
      qb.where('team_id', req.team.get('id'))
    },
    filter: {
      params: req.query.$filter,
      allowed: ['text'],
      search: ['text']
    },
    sort: {
      params: req.query.$sort,
      defaults: 'text',
      allowed: ['id','text']
    },
    page: req.query.$page,
    transacting: req.trx
  })

  res.status(200).respond(user_types, UserTypeSerializer)

}

export default listRoute
