import Model from '@core/objects/model'
import CartItem from './cart_item'
import Discount from './discount'
import moment from 'moment'
import Order from './order'

const Cart = new Model({

  databaseName: 'maha',

  tableName: 'stores_carts',

  rules: {},

  virtuals: {

    expires_at() {
      return moment(this.get('updated_at')).add(24, 'hours')
    }

  },

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
