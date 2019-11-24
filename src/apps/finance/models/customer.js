import Model from '../../../core/objects/model'
import Scholarship from './scholarship'
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
    }

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
