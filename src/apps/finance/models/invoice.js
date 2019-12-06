import Model from '../../../core/objects/model'
import Program from '../../crm/models/program'
import LineItem from './line_item'
import Customer from './customer'
import Payment from './payment'
import Coupon from './coupon'

const Invoice = new Model({

  tableName: 'finance_invoices',

  rules: {},

  virtuals: {},

  customer() {
    return this.belongsTo(Customer, 'customer_id')
  },

  coupon() {
    return this.belongsTo(Coupon, 'coupon_id')
  },

  line_items() {
    return this.hasMany(LineItem, 'invoice_id')
  },

  listener_ids(trx) {
    return []
  },

  payments() {
    return this.hasMany(Payment, 'invoice_id').query(qb => {
      qb.orderByRaw('date asc, created_at asc')
    })
  },

  program() {
    return this.belongsTo(Program, 'program_id')
  }

})

export default Invoice
