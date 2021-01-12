import Model from '@core/objects/model'
import Product from './product'

const Category = new Model({

  databaseName: 'maha',

  tableName: 'stores_categories',

  rules: {},

  virtuals: {},

  products() {
    return this.belongsToMany(Product, 'stores_products_categories', 'category_id', 'product_id')
  }

})

export default Category
