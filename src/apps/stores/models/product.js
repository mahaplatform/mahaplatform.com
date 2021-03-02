import knex from '@core/vendor/knex/maha'
import Model from '@core/objects/model'
import Category from './category'
import Variant from './variant'
import Store from './store'

const Product = new Model(knex, {

  databaseName: 'maha',

  tableName: 'stores_products',

  rules: {},

  virtuals: {},

  categories() {
    return this.belongsToMany(Category, 'stores_products_categories', 'product_id', 'category_id')
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
