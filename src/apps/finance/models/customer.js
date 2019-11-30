import Model from '../../../core/objects/model'
import Scholarship from './scholarship'
import Contact from '../../crm/models/contact'
import Invoice from './invoice'
import Credit from './credit'

const Customer = new Model({

  tableName: 'finance_customers',

  rules: {},

  virtuals: {

    full_name() {
      const parts = []
      if(this.get('first_name')) parts.push(this.get('first_name'))
      if(this.get('last_name')) parts.push(this.get('last_name'))
      return parts.length > 1 ? parts.join(' ') : null
    },

    rfc822() {
      return `${this.get('full_name')} <${this.get('email')}>`
    },

    display_name() {
      return this.get('full_name') ? this.get('full_name') : 'Unknown'
    },

    braintree_link() {
      const subdomain = process.env.BRAINTREE_ENVIRONMENT === 'sandbox' ? 'sandbox.' : ''
      const domain = `https://${subdomain}braintreegateway.com`
      return `${domain}/merchants/${process.env.BRAINTREE_MERCHANT_ID}/customers/${this.get('braintree_id')}`
    }

  },

  contact() {
    return this.belongsTo(Contact, 'id')
  },

  credits() {
    return this.hasMany(Credit, 'customer_id')
  },

  invoices() {
    return this.hasMany(Invoice, 'customer_id')
  },

  scholarships() {
    return this.hasMany(Scholarship, 'customer_id')
  }

})

export default Customer
