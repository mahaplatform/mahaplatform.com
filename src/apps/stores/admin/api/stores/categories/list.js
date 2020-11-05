import CategorySerializer from '@apps/stores/serializers/category_serializer'
import Category from '@apps/stores/models/category'

const listRoute = async (req, res) => {

  const categories = await Category.filterFetch({
    scope: qb => {
      qb.where('team_id', req.team.get('id'))
      qb.where('store_id', req.params.store_id)
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
