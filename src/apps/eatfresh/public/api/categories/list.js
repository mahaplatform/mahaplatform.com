import CategorySerializer from '../../../serializers/category_serializer'
import Category from '../../../models/category'

const listRoute = async (req, res) => {

  const categories = await Category.filterFetch({
    scope: (qb) => {
      qb.where('team_id', req.team.get('id'))
    },
    filter: {
      filter: req.query.$filter,
      search: ['title']
    },
    sort: {
      params: req.query.$sort,
      defaults: 'title',
      allowed: ['id','title']
    },
    page: req.query.$page,
    withRelated: ['photo'],
    transacting: req.trx
  })

  res.status(200).respond(categories, CategorySerializer)

}

export default listRoute
