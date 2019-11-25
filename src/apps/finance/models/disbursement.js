import Model from '../../../core/objects/model'
import Merchant from './merchant'
import Payment from './payment'

const Disbursement = new Model({

  tableName: 'finance_disbursements',

  rules: {},

  virtuals: {

    amount() {
      return this.get('total') - this.get('fees')
    },

    total() {
      return this.related('payments').reduce((total, payment) => {
        return total + Number(payment.get('amount'))
      }, 0.00)
    },

    fees() {
      return this.related('payments').reduce((fees, payment) => {
        return fees + Number(payment.get('fee'))
      }, 0.00)
    }

  },

  merchant() {
    return this.belongsTo(Merchant, 'merchant_id')
  },

  payments() {
    return this.hasMany(Payment, 'disbursement_id')
  }

})

export default Disbursement
