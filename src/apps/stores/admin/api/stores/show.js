import StoreSerializer from '../../../serializers/store_serializer'
import Store from '../../../models/store'

const showRoute = async (req, res) => {

  const store = await Store.query(qb => {
    qb.select(req.trx.raw('stores_stores.*,stores_store_totals.*'))
    qb.innerJoin('stores_store_totals','stores_store_totals.store_id','stores_stores.id')
    qb.where('team_id', req.team.get('id'))
    qb.where('id', req.params.id)
  }).fetch({
    withRelated: ['program','workflow'],
    transacting: req.trx
  })

  if(!store) return res.status(404).respond({
    code: 404,
    message: 'Unable to load store'
  })

  res.status(200).respond(store, StoreSerializer)

}

export default showRoute
