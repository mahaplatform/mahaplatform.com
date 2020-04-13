import Model from '../../../core/objects/model'
import PaymentMethod from './payment_method'
import Asset from '../../maha/models/asset'
import Disbursement from './disbursement'
import Scholarship from './scholarship'
import Merchant from './merchant'
import Invoice from './invoice'
import Credit from './credit'
import Refund from './refund'

const Payment = new Model({

  tableName: 'finance_payments',

  rules: {},

  virtuals: {

    braintree_link() {
      const subdomain = process.env.BRAINTREE_ENVIRONMENT === 'sandbox' ? 'sandbox.' : ''
      const domain = `https://${subdomain}braintreegateway.com`
      return `${domain}/merchants/${process.env.BRAINTREE_MERCHANT_ID}/transactions/${this.get('braintree_id')}`
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
      }, 0.00)
    },

    refundable() {
      return (this.get('amount') - this.get('refunded')).toFixed(2)
    }

  },

  credit() {
    return this.belongsTo(Credit, 'credit_id')
  },

  disbursement() {
    return this.belongsTo(Disbursement, 'disbursement_id')
  },

  invoice() {
    return this.belongsTo(Invoice, 'invoice_id')
  },

  merchant() {
    return this.belongsTo(Merchant, 'merchant_id')
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
