import UserTypeSerializer from '../../../serializers/user_type_serializer'
import UserType from '../../../../maha/models/user_type'

const listRoute = async (req, res) => {

  const user_types = await UserType.scope(qb => {
    qb.where('team_id', req.team.get('id'))
  }).filter({
    filter: req.query.$filter,
    filterParams: ['text'],
    searchParams: ['text']
  }).sort({
    sort: req.query.$sort,
    defaultSort: 'text',
    sortParams: ['id','text']
  }).fetchPage({
    page: req.query.$page,
    transacting: req.trx
  })

  res.status(200).respond(user_types, UserTypeSerializer)

}

export default listRoute
