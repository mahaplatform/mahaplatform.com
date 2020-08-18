import Model from '../../../core/objects/model'
import Variant from './variant'
import Order from './order'

const Item = new Model({

  tableName: 'stores_items',

  rules: {},

  virtuals: {},

  order() {
    return this.belongsTo(Order, 'order_id')
  },

  variant() {
    return this.belongsTo(Variant, 'variant_id')
  }

})

export default Item
