import _ from 'lodash'

const FixUlsterStore = {

  databaseName: 'maha',

  up: async (knex) => {
    const orders = await knex('stores_orders').where('store_id', 6)
    await Promise.mapSeries(orders, async (order) => {
      const order_items = await knex('stores_items').where('order_id', order.id)
      const items = await Promise.reduce(order_items, async (items, order_item) => {
        const variant = await knex('stores_variants').where('id', order_item.variant_id).then(r => r[0])
        const product = await knex('stores_products').where('id', variant.product_id).then(r => r[0])
        return {
          ...items,
          [variant.id]: {
            title: product.title,
            price: variant.fixed_price,
            quantity: items[variant.id] ? items[variant.id].quantity + 1 : 1
          }
        }
      }, {})

      const line_items = await knex('finance_line_items').where('invoice_id', order.invoice_id)
      await Promise.mapSeries(line_items, async (line_item) => {
        const item = _.find(items, {
          quantity: line_item.quantity,
          price: line_item.price
        })
        await knex('finance_line_items').where('id', line_item.id).update({
          description: line_item.description.replace('undefined', item.title)
        })
      })
    })
  },

  down: async (knex) => {
  }

}

export default FixUlsterStore
