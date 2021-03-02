import knex from '@core/vendor/knex/maha'
import Model from '@core/objects/model'
import Customer from './customer'
import Payment from './payment'

const PaymentMethod = new Model(knex, {

  databaseName: 'maha',

  tableName: 'finance_payment_methods',

  rules: {},

  virtuals: {

    braintree_link() {
      const subdomain = process.env.BRAINTREE_ENVIRONMENT === 'sandbox' ? 'sandbox.' : ''
      const domain = `https://${subdomain}braintreegateway.com`
      return `${domain}/merchants/${process.env.BRAINTREE_MERCHANT_ID}/payment_methods/${this.get('braintree_id')}`
    },

    description() {
      if(this.get('method') === 'paypal') return `PAYPAL-${this.get('email')}`
      if(this.get('method') === 'ach') return `${this.get('bank_name')}-${this.get('last_four')}`
      return `${this.get('card_type').toUpperCase()}-${this.get('last_four')}`
    }

  },

  customer() {
    return this.belongsTo(Customer, 'customer_id')
  },

  payments() {
    return this.hasMany(Payment, 'invoice_id')
  }

})

export default PaymentMethod
