import Model from '../../../core/objects/model'
import Payment from './payment'

const Refund = new Model({

  tableName: 'finance_refunds',

  rules: {},

  virtuals: {

    braintree_link() {
      const subdomain = process.env.BRAINTREE_ENVIRONMENT === 'sandbox' ? 'sandbox.' : ''
      const domain = `https://${subdomain}braintreegateway.com`
      return `${domain}/merchants/${process.env.BRAINTREE_MERCHANT_ID}/transactions/${this.get('braintree_id')}`
    }

  },

  payment() {
    return this.belongsTo(Payment, 'payment_id')
  }

})

export default Refund
