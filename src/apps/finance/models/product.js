import Model from '../../../core/objects/model'
import RevenueType from './revenue_type'
import Project from './project'
import Coupon from './coupon'

const Product = new Model({

  tableName: 'finance_products',

  rules: {},

  virtuals: {
    price() {
      if(this.get('price_type') === 'fixed') {
        return this.get('fixed_price')
      } else if(this.get('price_type') === 'sliding_scale') {
        return `${this.get('low_price')}-${this.get('high_price')}`
      }
    }
  },

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
