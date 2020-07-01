import Model from '../../../core/objects/model'
import Deposit from './deposit'
import Payment from './payment'

const Bank = new Model({

  tableName: 'finance_banks',

  rules: {},

  virtuals: {

    braintree_link() {
      const subdomain = process.env.BRAINTREE_ENVIRONMENT === 'sandbox' ? 'sandbox.' : ''
      const domain = `https://${subdomain}braintreegateway.com`
      return `${domain}/banks/${process.env.BRAINTREE_MERCHANT_ID}/home`
    }

  },

  deposits() {
    return this.hasMany(Deposit, 'bank_id')
  },

  payments() {
    return this.hasMany(Payment, 'bank_id')
  }

})

export default Bank
