import CategorySerializer from '@apps/stores/serializers/category_serializer'
import Category from '@apps/stores/models/category'

const listRoute = async (req, res) => {

  const categories = await Category.filterFetch({
    scope: qb => {
      qb.select('stores_categories.*','stores_category_totals.products_count')
      qb.innerJoin('stores_category_totals','stores_category_totals.category_id','stores_categories.id')
      qb.where('stores_categories.team_id', req.team.get('id'))
      qb.where('stores_categories.store_id', req.params.store_id)
    },
    filter: {
      params: req.query.$filter,
      allowed: ['id']
    },
    sort: {
      params: req.query.$sort,
      defaults: 'title'
    },
    page: req.query.$page,
    transacting: req.trx
  })

  res.status(200).respond(categories, CategorySerializer)

}

export default listRoute
