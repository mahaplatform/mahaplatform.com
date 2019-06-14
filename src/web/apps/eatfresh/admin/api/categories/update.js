import CategorySerializer from '../../../serializers/category_serializer'
import { activity } from '../../../../../core/services/routes/activities'
import { whitelist } from '../../../../../core/services/routes/params'
import socket from '../../../../../core/services/routes/emitter'
import Category from '../../../models/category'

const updateRoute = async (req, res) => {

  const category = await Category.scope({
    team: req.team
  }).query(qb => {
    qb.where('id', req.params.id)
  }).fetch({
    transacting: req.trx
  })

  if(!category) return req.status(404).respond({
    code: 404,
    message: 'Unable to load category'
  })

  await category.save(whitelist(req.body, ['title','photo_id']), {
    transacting: req.trx
  })

  await activity(req, {
    story: 'updated {object}',
    object: category
  })

  await socket.refresh(req, [
    '/admin/eatfresh/categories'
  ])

  await category.load(['photo'], {
    transacting: req.trx
  })

  res.status(200).respond(category, (category) => {
    return CategorySerializer(req, req.trx, category)
  })

}

export default updateRoute
