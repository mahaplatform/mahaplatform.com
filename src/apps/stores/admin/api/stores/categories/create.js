import CategorySerializer from '@apps/stores/serializers/category_serializer'
import { activity } from '@core/services/routes/activities'
import Category from '@apps/stores/models/category'
import socket from '@core/services/routes/emitter'
import Store from '@apps/stores/models/store'

const createRoute = async (req, res) => {

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

  const category = await Category.forge({
    team_id: req.team.get('id'),
    store_id: store.get('id'),
    title: req.body.title,
    slug: req.body.title.replace(/[^A-Za-z0-9\s]+/g, '').replace(/[\s]+/g, '-').toLowerCase()
  }).save(null, {
    transacting: req.trx
  })

  await activity(req, {
    story: 'created {object}',
    object: category
  })

  await socket.refresh(req, [
    `/admin/stores/stores/${store.get('id')}`
  ])

  await res.status(200).respond(category, CategorySerializer)

}

export default createRoute
