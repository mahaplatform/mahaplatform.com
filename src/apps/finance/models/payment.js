import Model from '../../../core/objects/model'
import Disbursement from './disbursement'
import Scholarship from './scholarship'
import Merchant from './merchant'
import Invoice from './invoice'
import Credit from './credit'
import Refund from './refund'
import _ from 'lodash'

const Payment = new Model({

  tableName: 'finance_payments',

  rules: {},

  virtuals: {

    braintree_link() {
      const subdomain = process.env.BRAINTREE_ENVIRONMENT === 'sandbox' ? 'sandbox.' : ''
      const domain = `https://${subdomain}braintreegateway.com`
      return `${domain}/merchants/${process.env.BRAINTREE_MERCHANT_ID}/transactions/${this.get('braintree_id')}`
    },

    description() {
      if(_.includes(['googlepay','applepay','card'], this.get('method'))) return `${this.get('card_type').toUpperCase()}-${this.get('reference')}`
      if(this.get('method') === 'paypal') return `PAYPAL-${this.get('reference')}`
      if(this.get('method') === 'check') return this.get('reference')
      return null
    },

    fee() {
      const fee = this.get('rate') * this.get('amount')
      return (Math.floor(fee * 100) / 100) + 0.30
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

  refunds() {
    return this.hasMany(Refund, 'payment_id')
  },

  scholarship() {
    return this.belongsTo(Scholarship, 'scholarship_id')
  }

})

export default Payment
