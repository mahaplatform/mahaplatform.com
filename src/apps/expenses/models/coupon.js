import Model from '../../../core/objects/model'
import Invoice from './invoice'

const Coupon = new Model({

  tableName: 'expenses_coupons',

  rules: {},

  virtuals: {},

  invoices() {
    return this.hasMany(Invoice, 'coupon_id')
  }

})

export default Coupon
