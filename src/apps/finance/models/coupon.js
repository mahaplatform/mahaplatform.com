import Model from '../../../core/objects/model'
import Invoice from './invoice'
import Product from './product'

const Coupon = new Model({

  tableName: 'finance_coupons',

  rules: {},

  virtuals: {

    product_ids: function() {
      return this.related('products').map(product => product.id)
    }

  },

  invoices() {
    return this.hasMany(Invoice, 'coupon_id')
  },

  products() {
    return this.belongsToMany(Product, 'finance_coupons_products', 'coupon_id', 'product_id')
  }

})

export default Coupon
