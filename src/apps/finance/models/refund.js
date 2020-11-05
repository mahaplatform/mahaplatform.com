import Model from '@core/objects/model'
import Allocation from './allocation'
import Payment from './payment'
import Deposit from './deposit'
import Credit from './credit'

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

  allocations() {
    return this.hasMany(Allocation, 'refund_id')
  },

  credit() {
    return this.belongsTo(Credit, 'credit_id')
  },

  deposit() {
    return this.belongsTo(Deposit, 'deposit_id')
  },

  payment() {
    return this.belongsTo(Payment, 'payment_id').query(qb => {
      qb.select('finance_payments.*','finance_payment_details.*')
      qb.innerJoin('finance_payment_details','finance_payment_details.payment_id','finance_payments.id')
    })
  }

})

export default Refund
