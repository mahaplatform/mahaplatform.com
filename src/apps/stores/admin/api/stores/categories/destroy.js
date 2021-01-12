import CategorySerializer from '@apps/stores/serializers/category_serializer'
import { activity } from '@core/services/routes/activities'
import Category from '@apps/stores/models/category'
import socket from '@core/services/routes/emitter'
import Store from '@apps/stores/models/store'

const destroyRoute = async (req, res) => {

  const store = await Store.query(qb => {
    qb.where('team_id', req.team.get('id'))
    qb.where('id', req.params.store_id)
  }).fetch({
    transacting: req.trx
  })

  if(!store) return res.status(404).respond({
    code: 404,
    message: 'Unable to load store'
  })

  const category = await Category.query(qb => {
    qb.where('store_id', store.get('id'))
    qb.where('id', req.params.id)
  }).fetch({
    transacting: req.trx
  })

  if(!category) return res.status(404).respond({
    code: 404,
    message: 'Unable to load category'
  })

  res.status(200).respond(true)

}

export default destroyRoute
