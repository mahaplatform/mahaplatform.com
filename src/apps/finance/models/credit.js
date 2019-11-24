import Model from '../../../core/objects/model'
import Customer from './customer'
import Payment from './payment'

const Credit = new Model({

  tableName: 'finance_credits',

  rules: {},

  virtuals: {},

  customer() {
    return this.belongsTo(Customer, 'customer_id')
  },

  payments() {
    return this.hasMany(Payment, 'credit_id')
  }

})

export default Credit
