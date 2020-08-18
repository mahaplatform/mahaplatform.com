import Model from '../../../core/objects/model'
import Item from './item'
import Cart from './cart'

const Order = new Model({

  tableName: 'stores_orders',

  rules: {},

  virtuals: {},

  cart() {
    return this.belongsTo(Cart, 'cart_id')
  },

  items() {
    return this.hasMany(Item, 'order_id')
  }

})

export default Order
