import Model from '../../../core/objects/model'
import Invoice from './invoice'
import Product from './product'

const Coupon = new Model({

  tableName: 'finance_coupons',

  rules: {},

  virtuals: {},

  invoices() {
    return this.hasMany(Invoice, 'coupon_id')
  },

  product() {
    return this.belongsTo(Product, 'product_id')
  }

})

export default Coupon
