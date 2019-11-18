import Model from '../../../core/objects/model'
import Product from './product'

const RevenueType = new Model({

  tableName: 'expenses_revenue_types',

  rules: {},

  virtuals: {},

  products() {
    return this.hasMany(Product, 'revenue_type_id')
  }

})

export default RevenueType
