import Model from '@core/objects/model'
import Variant from './variant'
import Cart from './cart'

const CartItem = new Model({

  databaseName: 'maha',

  tableName: 'stores_cart_items',

  rules: {},

  virtuals: {},

  order() {
    return this.belongsTo(Cart, 'cart_id')
  },

  variant() {
    return this.belongsTo(Variant, 'variant_id')
  }

})

export default CartItem
