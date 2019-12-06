import Model from '../../../core/objects/model'
import Customer from './customer'
import Payment from './payment'

const Card = new Model({

  tableName: 'finance_cards',

  rules: {},

  virtuals: {

    braintree_link() {
      const subdomain = process.env.BRAINTREE_ENVIRONMENT === 'sandbox' ? 'sandbox.' : ''
      const domain = `https://${subdomain}braintreegateway.com`
      return `${domain}/merchants/${process.env.BRAINTREE_MERCHANT_ID}/payment_methods/${this.get('braintree_id')}`
    },

    description() {
      return `${this.get('type').toUpperCase()}-${this.get('last_four')}`
    }

  },

  customer() {
    return this.belongsTo(Customer, 'customer_id')
  },

  payments() {
    return this.hasMany(Payment, 'invoice_id')
  }

})

export default Card
