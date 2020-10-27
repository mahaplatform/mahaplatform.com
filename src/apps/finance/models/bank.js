import Model from '../../../core/objects/model'
import Program from '../../crm/models/program'
import Deposit from './deposit'
import Payment from './payment'

const Bank = new Model({

  tableName: 'finance_banks',

  rules: {},

  virtuals: {

    braintree_link() {
      const subdomain = process.env.BRAINTREE_ENVIRONMENT === 'sandbox' ? 'sandbox.' : ''
      const domain = `https://${subdomain}braintreegateway.com`
      return `${domain}/merchants/${process.env.BRAINTREE_MERCHANT_ID}/home`
    },

    program_ids: function() {
      return this.related('programs').map(group => group.id)
    }

  },

  deposits() {
    return this.hasMany(Deposit, 'bank_id')
  },

  payments() {
    return this.hasMany(Payment, 'bank_id')
  },

  programs() {
    return this.hasMany(Program, 'bank_id')
  }

})

export default Bank
