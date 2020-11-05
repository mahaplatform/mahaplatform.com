import CategorySerializer from '@apps/learning/serializers/category_serializer'
import { activity } from '@core/services/routes/activities'
import { whitelist } from '@core/services/routes/params'
import socket from '@core/services/routes/emitter'
import Category from '@apps/learning/models/category'

const updateRoute = async (req, res) => {

  const category = await Category.query(qb => {
    qb.where('team_id', req.team.get('id'))
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
    patch: true,
    transacting: req.trx
  })

  await activity(req, {
    story: 'updated {object}',
    object: category
  })

  await socket.refresh(req, [
    '/admin/learning/categories',
    `/admin/learning/categories/${category.get('id')}`
  ])

  res.status(200).respond(category, CategorySerializer)

}

export default updateRoute
