import ItemSerializer from '@apps/stores/serializers/item_serializer'
import Item from '@apps/stores/models/item'

const listRoute = async (req, res) => {

  const items = await Item.filterFetch({
    scope: qb => {
      qb.where('stores_items.team_id', req.team.get('id'))
      qb.where('stores_items.order_id', req.params.order_id)
    },
    sort: {
      params: req.query.$sort,
      defaults: 'created_at'
    },
    withRelated: ['variant.product','variant.photos.asset'],
    page: req.query.$page,
    transacting: req.trx
  })

  res.status(200).respond(items, ItemSerializer)

}

export default listRoute
