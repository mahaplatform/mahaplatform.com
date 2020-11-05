import Model from '@core/objects/model'
import Discount from './discount'
import Store from './store'
import Item from './item'
import Cart from './cart'

const Order = new Model({

  tableName: 'stores_orders',

  rules: {},

  virtuals: {},

  cart() {
    return this.belongsTo(Cart, 'cart_id')
  },

  discount() {
    return this.belongsTo(Discount, 'discount_id')
  },

  items() {
    return this.hasMany(Item, 'order_id')
  },

  store() {
    return this.belongsTo(Store, 'store_id')
  }

})

export default Order
