import Model from '../../../core/objects/model'
import Variant from './variant'
import Option from './option'
import Media from './media'
import Store from './store'

const Product = new Model({

  tableName: 'stores_products',

  rules: {},

  virtuals: {},

  media() {
    return this.hasMany(Media, 'product_id')
  },

  options() {
    return this.hasMany(Option, 'product_id')
  },

  stores() {
    return this.belongsTo(Store, 'store_id')
  },

  variants() {
    return this.hasMany(Variant, 'product_id')
  },

  base_variant() {
    return this.hasOne(Variant, 'base_variant_id')
  }

})

export default Product
