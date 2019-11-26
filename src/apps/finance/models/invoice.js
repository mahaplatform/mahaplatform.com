import Model from '../../../core/objects/model'
import Program from '../../crm/models/program'
import LineItem from './line_item'
import Customer from './customer'
import Payment from './payment'
import Coupon from './coupon'
import moment from 'moment'

const Invoice = new Model({

  tableName: 'finance_invoices',

  rules: {},

  virtuals: {

    balance() {
      return this.get('total') - this.get('paid')
    },

    discount() {
      if(!this.related('coupon').id) {
        return 0.00
      } else if(this.related('coupon').get('percent')) {
        return this.get('subtotal') * this.related('coupon').get('percent')
      } else if(this.related('coupon').get('amount')) {
        return this.related('coupon').get('amount')
      }
    },

    is_paid() {
      return this.get('paid') === this.get('total')
    },

    paid() {
      return this.related('payments').toArray().filter(payment => {
        return payment.get('voided_at') === null
      }).reduce((paid, payment) => {
        return paid + Number(payment.get('amount'))
      }, 0.00)
    },

    status() {
      if(this.get('voided_at')) return 'void'
      if(this.get('is_paid')) return 'paid'
      if(moment().diff(moment(this.get('due')), 'days') > 0) return 'overdue'
      return 'unpaid'
    },

    subtotal() {
      return this.related('line_items').reduce((subtotal, line_item) => {
        return subtotal + line_item.get('total')
      }, 0.00)
    },

    tax() {
      return this.related('line_items').reduce((tax, line_item) => {
        return tax + line_item.get('tax')
      }, 0.00)
    },

    total() {
      return this.get('subtotal') + this.get('tax') - this.get('discount')
    }

  },

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
    return this.hasMany(Payment, 'invoice_id')
  },

  program() {
    return this.belongsTo(Program, 'program_id')
  }

})

export default Invoice
