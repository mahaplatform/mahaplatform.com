import FilterSerializer from '../../../serializers/filter_serializer'
import Filter from '../../../models/filter'

const listRoute = async (req, res) => {

  console.log(req.params)

  const filters = await Filter.query(qb => {
    qb.leftJoin('maha_filter_accesses','maha_filter_accesses.filter_id','maha_filters.id')
    qb.leftJoin('maha_users_groups','maha_users_groups.user_id','maha_filter_accesses.user_id')
    qb.whereRaw('maha_filters.team_id is null or maha_filters.team_id=?', req.team.get('id'))
    qb.whereRaw('maha_filters.owner_id is null or maha_filters.owner_id=? or maha_filter_accesses.user_id=? or maha_users_groups.user_id=?', [req.user.get('id'),req.user.get('id'),req.user.get('id')])
    qb.where('code', req.params.code)
  }).fetchPage({
    page: req.query.$page,
    transacting: req.trx
  })

  res.status(200).respond(filters, FilterSerializer)

}

export default listRoute
