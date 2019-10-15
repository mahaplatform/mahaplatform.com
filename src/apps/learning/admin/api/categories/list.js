import CategorySerializer from '../../../serializers/category_serializer'
import Category from '../../../models/category'

const listRoute = async (req, res) => {

  const categories = await Category.scope(qb => {
    qb.where('team_id', req.team.get('id'))
  }).filter({
    filter: req.query.$filter,
    searchParams: ['id','title']
  }).sort({
    sort: req.query.$sort,
    defaultSort: 'title'
  }).fetchPage({
    page: req.query.$page,
    transacting: req.trx
  })

  res.status(200).respond(categories, CategorySerializer)

}

export default listRoute
