import Model from '../../../core/objects/model'
import Contact from '../../crm/models/contact'
import LineItem from './line_item'
import Payment from './payment'
import Coupon from './coupon'

const Invoice = new Model({

  tableName: 'finance_invoices',

  rules: {},

  virtuals: {},

  contact() {
    this.belongsTo(Contact, 'contact_id')
  },

  coupon() {
    return this.belongsTo(Coupon, 'coupon_id')
  },

  line_items() {
    return this.hasMany(LineItem, 'invoice_id')
  },

  payments() {
    return this.hasMany(Payment, 'invoice_id')
  }

})

export default Invoice
