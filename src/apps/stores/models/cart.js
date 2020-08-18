import Model from '../../../core/objects/model'
import Order from './order'

const Cart = new Model({

  tableName: 'stores_carts',

  rules: {},

  virtuals: {},

  order() {
    return this.hasOne(Order, 'order_id')
  }

})

export default Cart
