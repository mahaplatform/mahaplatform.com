import StoreSerializer from '@apps/stores/serializers/store_serializer'
import Store from '@apps/stores/models/store'

const listRoute = async (req, res) => {

  const store = await Store.filterFetch({
    scope: qb => {
      qb.where('team_id', req.team.get('id'))
      qb.whereNull('deleted_at')
    },
    filter: {
      params: req.query.$filter,
      allowed: ['id']
    },
    sort: {
      params: req.query.$sort,
      defaults: 'code'
    },
    page: req.query.$page,
    withRelated: ['program.logo'],
    transacting: req.trx
  })

  res.status(200).respond(store, StoreSerializer)

}

export default listRoute
