import Model from '../../../core/objects/model'
import Program from '../../crm/models/program'
import LineItem from './line_item'
import Customer from './customer'
import Payment from './payment'

const InvoiceLineItem = new Model({
  tableName: 'finance_invoice_line_items'
})

const Invoice = new Model({

  tableName: 'finance_invoices',

  rules: {},

  virtuals: {

    object_text: function() {
      return ''
    },

    object_type: function() {
      return 'invoice'
    },

    object_url: function() {
      return `/finance/invoices/${this.get('id')}`
    }

  },

  customer() {
    return this.belongsTo(Customer, 'customer_id')
  },

  invoice_line_items() {
    return this.hasMany(InvoiceLineItem, 'invoice_id')
  },

  line_items() {
    return this.hasMany(LineItem, 'invoice_id')
  },

  listener_ids(trx) {
    return []
  },

  payments() {
    return this.hasMany(Payment, 'invoice_id').query(qb => {
      qb.select('finance_payments.*','finance_payment_details.*')
      qb.innerJoin('finance_payment_details', 'finance_payment_details.payment_id', 'finance_payments.id')
      qb.orderByRaw('date asc, created_at asc')
    })
  },

  program() {
    return this.belongsTo(Program, 'program_id')
  }

})

export default Invoice
