import CategorySerializer from '@apps/eatfresh/serializers/category_serializer'
import { activity } from '@core/services/routes/activities'
import { whitelist } from '@core/services/routes/params'
import socket from '@core/services/routes/emitter'
import Category from '@apps/eatfresh/models/category'

const createRoute = async (req, res) => {

  const category = await Category.forge({
    team_id: req.team.get('id'),
    ...whitelist(req.body, ['title','photo_id'])
  }).save(null, {
    transacting: req.trx
  })

  await activity(req, {
    story: 'created {object}',
    object: category
  })

  await socket.refresh(req, [
    '/admin/eatfresh/categories'
  ])

  res.status(200).respond(category, CategorySerializer)

}

export default createRoute
