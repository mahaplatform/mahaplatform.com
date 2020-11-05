import Model from '@core/objects/model'
import PaymentMethod from './payment_method'
import Asset from '@apps/maha/models/asset'
import Scholarship from './scholarship'
import Allocation from './allocation'
import Invoice from './invoice'
import Deposit from './deposit'
import Credit from './credit'
import Refund from './refund'
import Bank from './bank'

const Payment = new Model({

  tableName: 'finance_payments',

  rules: {},

  virtuals: {

    braintree_link() {
      const subdomain = process.env.BRAINTREE_ENVIRONMENT === 'sandbox' ? 'sandbox.' : ''
      const domain = `https://${subdomain}braintreegateway.com`
      return `${domain}/merchants/${process.env.BRAINTREE_MERCHANT_ID}/transactions/${this.get('braintree_id')}`
    },

    paypal_link() {
      return `https://www.paypal.com/activity/payment//${this.get('paypal_id')}`
    },

    activity() {
      if(this.get('method') === 'googlepay') return `Charged ${this.get('reference')} via GooglePay`
      if(this.get('method') === 'applepay') return `Charged ${this.get('reference')} via ApplePay`
      if(this.get('method') === 'paypal') return `Charged paypal account ${this.get('reference')}`
      if(this.get('method') === 'check') return `Received check ${this.get('reference')}`
      if(this.get('method') === 'card') return `Charged ${this.get('reference')}`
      if(this.get('method') === 'ach') return `Debited ${this.get('reference')}`
      if(this.get('method') === 'scholarship') return 'Applied scholarship'
      if(this.get('method') === 'credit') return 'Applied customer credit'
      if(this.get('method') === 'cash') return 'Received cash'
    },

    refunded() {
      return this.related('refunds').reduce((refunded, refund) => {
        return refunded + Number(refund.get('amount'))
      }, 0.00).toFixed(2)
    },

    refundable() {
      return (this.get('amount') - Number(this.get('refunded'))).toFixed(2)
    }

  },

  allocations() {
    return this.hasMany(Allocation, 'payment_id')
  },

  credit() {
    return this.belongsTo(Credit, 'credit_id')
  },

  deposit() {
    return this.belongsTo(Deposit, 'deposit_id')
  },

  invoice() {
    return this.belongsTo(Invoice, 'invoice_id')
  },

  bank() {
    return this.belongsTo(Bank, 'bank_id')
  },

  payment_method() {
    return this.belongsTo(PaymentMethod, 'payment_method_id')
  },

  photo() {
    return this.belongsTo(Asset, 'photo_id')
  },

  refunds() {
    return this.hasMany(Refund, 'payment_id')
  },

  scholarship() {
    return this.belongsTo(Scholarship, 'scholarship_id')
  }

})

export default Payment
