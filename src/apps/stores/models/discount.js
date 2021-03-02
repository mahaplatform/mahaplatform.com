import knex from '@core/vendor/knex/maha'
import Model from '@core/objects/model'
import Variant from './variant'
import Order from './order'
import Store from './store'

const Discount = new Model(knex, {

  databaseName: 'maha',

  tableName: 'stores_discounts',

  rules: {},

  virtuals: {},

  orders() {
    return this.belongsTo(Order, 'discount_id')
  },

  store() {
    return this.belongsTo(Store, 'store_id')
  },

  variants() {
    return this.belongsToMany(Variant, 'stores_discounts_variants','discount_id','variant_id')
  }

})

export default Discount
