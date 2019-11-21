import Model from '../../../core/objects/model'
import Disbursement from './disbursement'
import Payment from './payment'

const Merchant = new Model({

  tableName: 'finance_merchants',

  rules: {},

  virtuals: {},

  disbursements() {
    return this.hasMany(Disbursement, 'merchant_id')
  },

  payments() {
    return this.hasMany(Payment, 'merchant_id')
  }

})

export default Merchant
