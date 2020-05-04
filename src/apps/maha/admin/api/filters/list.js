import FilterSerializer from '../../../serializers/filter_serializer'
import Filter from '../../../models/filter'

const listRoute = async (req, res) => {

  const filters = await Filter.filterFetch({
    scope: (qb) => {
      qb.leftJoin('maha_filter_accesses','maha_filter_accesses.filter_id','maha_filters.id')
      qb.leftJoin('maha_users_groups','maha_users_groups.group_id','maha_filter_accesses.group_id')
      qb.joinRaw('left join maha_groupings_users on maha_groupings_users.grouping_id=maha_filter_accesses.grouping_id and maha_groupings_users.team_id=maha_filter_accesses.team_id')
      qb.whereRaw('(maha_filters.team_id is null or maha_filters.team_id=?)', req.team.get('id'))
      qb.whereRaw('(maha_groupings_users.user_id=? or maha_filters.owner_id=? or maha_filter_accesses.user_id=? or maha_users_groups.user_id=?)', [req.user.get('id'),req.user.get('id'),req.user.get('id'),req.user.get('id')])
      qb.where('code', req.params.code)
      qb.orderByRaw('lower(maha_filters.title)')
    },
    filter: {
      params: req.query.$filter,
      allowed: ['id']
    },
    page: req.query.$page,
    withRelated: ['owner'],
    transacting: req.trx
  })

  res.status(200).respond(filters, FilterSerializer)

}

export default listRoute
