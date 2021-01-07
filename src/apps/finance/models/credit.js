import Model from '@core/objects/model'
import Program from '@apps/crm/models/program'
import Customer from './customer'
import Payment from './payment'

const Credit = new Model({

  databaseName: 'maha',

  tableName: 'finance_credits',

  rules: {},

  virtuals: {},

  customer() {
    return this.belongsTo(Customer, 'customer_id')
  },

  payments() {
    return this.hasMany(Payment, 'credit_id')
  },

  program() {
    return this.belongsTo(Program, 'program_id')
  }

})

export default Credit
