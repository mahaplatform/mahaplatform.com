import Model from '../../../core/objects/model'
import Deposit from './deposit'
import Payment from './payment'

const Merchant = new Model({

  tableName: 'finance_merchants',

  rules: {},

  virtuals: {

    braintree_link() {
      const subdomain = process.env.BRAINTREE_ENVIRONMENT === 'sandbox' ? 'sandbox.' : ''
      const domain = `https://${subdomain}braintreegateway.com`
      return `${domain}/merchants/${process.env.BRAINTREE_MERCHANT_ID}/home`
    }

  },

  deposits() {
    return this.hasMany(Deposit, 'merchant_id')
  },

  payments() {
    return this.hasMany(Payment, 'merchant_id')
  }

})

export default Merchant
