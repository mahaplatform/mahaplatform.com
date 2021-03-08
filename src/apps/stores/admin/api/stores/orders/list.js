import OrderSerializer from '@apps/stores/serializers/order_serializer'
import Order from '@apps/stores/models/order'
import Store from '@apps/stores/models/store'

const listRoute = async (req, res) => {

  const store = await Store.query(qb => {
    qb.where('team_id', req.team.get('id'))
    qb.where('id', req.params.store_id)
  }).fetch({
    withRelated: ['products.variants'],
    transacting: req.trx
  })

  if(!store) return res.status(404).respond({
    code: 404,
    message: 'Unable to load store'
  })

  const orders = await Order.filterFetch({
    scope: qb => {
      qb.select(req.trx.raw('distinct on (stores_orders.id,crm_contacts.last_name,stores_orders.created_at) stores_orders.*,stores_order_totals.*,stores_order_variant_totals.variant_totals,stores_order_tokens.tokens'))
      qb.innerJoin('stores_order_totals','stores_order_totals.order_id','stores_orders.id')
      qb.innerJoin('stores_order_variant_totals','stores_order_variant_totals.order_id','stores_orders.id')
      qb.innerJoin('stores_order_tokens','stores_order_tokens.order_id','stores_orders.id')
      qb.innerJoin('crm_contacts','crm_contacts.id','stores_orders.contact_id')
      qb.innerJoin('stores_items','stores_items.order_id','stores_orders.id')
      qb.innerJoin('stores_variants','stores_variants.id','stores_items.variant_id')
      qb.where('stores_orders.team_id', req.team.get('id'))
      qb.where('stores_orders.store_id', store.get('id'))
    },
    aliases: {
      contact: 'crm_contacts.last_name',
      product_id: 'stores_variants.product_id'
    },
    filter: {
      params: req.query.$filter,
      allowed: ['id']
    },
    sort: {
      params: req.query.$sort,
      defaults: '-created_at'
    },
    withRelated: ['contact.photo','payment'],
    page: req.query.$page,
    transacting: req.trx
  })

  res.status(200).respond(orders, OrderSerializer)

}

export default listRoute
