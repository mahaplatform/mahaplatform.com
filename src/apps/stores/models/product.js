import Model from '../../../core/objects/model'
import Variant from './variant'
import Store from './store'

const Product = new Model({

  tableName: 'stores_products',

  rules: {},

  virtuals: {},

  stores() {
    return this.belongsTo(Store, 'store_id')
  },

  variants() {
    return this.hasMany(Variant, 'product_id').query(qb => {
      qb.select('stores_variants.*','stores_reservations.inventory_reserved')
      qb.innerJoin('stores_reservations','stores_reservations.variant_id','stores_variants.id')
    })
  },

  base_variant() {
    return this.hasOne(Variant, 'base_variant_id')
  }

})

export default Product
