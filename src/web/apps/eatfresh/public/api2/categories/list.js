import CategorySerializer from '../../../serializers/category_serializer'
import Category from '../../../models/category'

const listRoute = async (req, res) => {

  const categories = await Category.query(qb => {
    qb.where('team_id', req.team.get('id'))
  }).filter({
    filter: req.query.$filter,
    searchParams: ['title']
  }).sort({
    sort: req.query.$sort,
    defaultSort: 'title',
    sortParams: ['id','title']
  }).fetchPage({
    page: req.query.$page,
    withRelated: ['photo'],
    transacting: req.trx
  })

  res.status(200).respond(categories, (category) => {
    return CategorySerializer(req, req.trx, category)
  })

}

export default listRoute
