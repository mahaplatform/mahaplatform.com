import Model from '@core/objects/model'
import CartItem from './cart_item'
import Discount from './discount'
import Order from './order'

const Cart = new Model({

  tableName: 'stores_carts',

  rules: {},

  virtuals: {},

  discount() {
    return this.belongsTo(Discount, 'discount_id')
  },

  items() {
    return this.hasMany(CartItem, 'cart_id')
  },

  order() {
    return this.hasOne(Order, 'order_id')
  }

})

export default Cart
