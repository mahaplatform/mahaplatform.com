import CategorySerializer from '../../../serializers/category_serializer'
import Category from '../../../models/category'

const showRoute = async (req, res) => {

  const category = await Category.scope({
    team: req.team
  }).query(qb => {
    qb.where('id', req.params.id)
  }).fetch({
    withRelated: ['photo'],
    transacting: req.trx
  })

  if(!category) return req.status(404).respond({
    code: 404,
    message: 'Unable to load category'
  })

  res.status(200).respond(category, CategorySerializer)

}

export default showRoute
