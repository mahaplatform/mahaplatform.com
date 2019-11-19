import Model from '../../../core/objects/model'
import Payment from './payment'

const Merchant = new Model({

  tableName: 'finance_merchants',

  rules: {},

  virtuals: {},

  payments() {
    return this.hasMany(Payment, 'merchant_id')
  }

})

export default Merchant
