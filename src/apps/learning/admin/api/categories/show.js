import CategorySerializer from '@apps/learning/serializers/category_serializer'
import Category from '@apps/learning/models/category'

const showRoute = async (req, res) => {

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

  res.status(200).respond(category, CategorySerializer)

}

export default showRoute
