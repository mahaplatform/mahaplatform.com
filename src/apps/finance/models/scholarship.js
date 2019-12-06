import Model from '../../../core/objects/model'
import Program from '../../crm/models/program'
import Customer from './customer'
import Payment from './payment'

const Scholarship = new Model({

  tableName: 'finance_scholarships',

  rules: {},

  virtuals: {},

  customer() {
    return this.belongsTo(Customer, 'customer_id')
  },

  payments() {
    return this.hasMany(Payment, 'scholarship_id')
  },

  program() {
    return this.belongsTo(Program, 'program_id')
  }

})

export default Scholarship
