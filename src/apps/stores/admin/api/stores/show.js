import StoreSerializer from '@apps/stores/serializers/store_serializer'
import Store from '@apps/stores/models/store'

const showRoute = async (req, res) => {

  const store = await Store.query(qb => {
    qb.select(req.trx.raw('stores_stores.*,stores_store_totals.*'))
    qb.innerJoin('stores_store_totals','stores_store_totals.store_id','stores_stores.id')
    qb.where('team_id', req.team.get('id'))
    qb.where('id', req.params.id)
  }).fetch({
    withRelated: ['program'],
    transacting: req.trx
  })

  if(!store) return res.status(404).respond({
    code: 404,
    message: 'Unable to load store'
  })

  await res.status(200).respond(store, StoreSerializer)

}

export default showRoute
