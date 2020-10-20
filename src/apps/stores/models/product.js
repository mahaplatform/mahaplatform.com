import Model from '../../../core/objects/model'
import Category from './category'
import Variant from './variant'
import Store from './store'

const Product = new Model({

  tableName: 'stores_products',

  rules: {},

  virtuals: {},

  category() {
    return this.belongsTo(Category, 'category_id')
  },

  variants() {
    return this.hasMany(Variant, 'product_id').query(qb => {
      qb.select('stores_variants.*','stores_inventories.*')
      qb.innerJoin('stores_inventories','stores_inventories.variant_id','stores_variants.id')
    })
  },

  store() {
    return this.belongsTo(Store, 'store_id')
  }

})

export default Product
