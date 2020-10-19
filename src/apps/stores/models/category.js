import Model from '../../../core/objects/model'
import Product from './product'

const Category = new Model({

  tableName: 'stores_categories',

  rules: {},

  virtuals: {},

  products() {
    return this.hasMany(Product, 'category_id')
  }

})

export default Category
