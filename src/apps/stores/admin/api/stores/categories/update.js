import CategorySerializer from '@apps/stores/serializers/category_serializer'
import { activity } from '@core/services/routes/activities'
import { whitelist } from '@core/services/routes/params'
import { audit } from '@core/services/routes/audit'
import Category from '@apps/stores/models/category'
import socket from '@core/services/routes/emitter'
import Store from '@apps/stores/models/store'

const updateRoute = async (req, res) => {

  const store = await Store.query(qb => {
    qb.where('team_id', req.team.get('id'))
    qb.where('id', req.params.store_id)
  }).fetch({
    withRelated: ['program'],
    transacting: req.trx
  })

  if(!store) return res.status(404).respond({
    code: 404,
    message: 'Unable to load store'
  })

  const category = await Category.query(qb => {
    qb.where('team_id', req.team.get('id'))
    qb.where('store_id', store.get('id'))
    qb.where('id', req.params.id)
  }).fetch({
    transacting: req.trx
  })

  if(!category) return res.status(404).respond({
    code: 404,
    message: 'Unable to load category'
  })

  await category.save({
    ...whitelist(req.body, ['title'])
  }, {
    transacting: req.trx,
    patch: true
  })

  await audit(req, {
    story: 'updated',
    auditable: category
  })

  await activity(req, {
    story: 'updated {object}',
    object: category
  })

  await socket.refresh(req, [
    `/admin/stores/stores/${store.get('id')}`
  ])

  res.status(200).respond(category, CategorySerializer)

}

export default updateRoute
