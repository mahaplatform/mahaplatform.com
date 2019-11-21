import Model from '../../../core/objects/model'
import Contact from '../../crm/models/contact'
import LineItem from './line_item'
import Payment from './payment'
import Coupon from './coupon'

const Invoice = new Model({

  tableName: 'finance_invoices',

  rules: {},

  virtuals: {

    balance() {
      return this.get('total') - this.get('paid')
    },

    discount() {
      if(!this.related('coupon')) {
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
      return this.related('payments').reduce((paid, payment) => {
        return paid + payment.get('amount')
      }, 0.00)
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
