import Model from '../../../core/objects/model'
import RevenueType from './revenue_type'
import Project from './project'
import Coupon from './coupon'

const Product = new Model({

  tableName: 'finance_products',

  rules: {},

  virtuals: {},

  coupons() {
    return this.belongsToMany(Coupon, 'finance_coupons_products', 'product_id', 'coupon_id')
  },

  revenue_type() {
    return this.belongsTo(RevenueType, 'revenue_type_id')
  },

  project() {
    return this.belongsTo(Project, 'project_id')
  }

})

export default Product
