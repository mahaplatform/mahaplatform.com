import Model from '@core/objects/model'
import Program from '@apps/crm/models/program'
import RevenueType from './revenue_type'
import Customer from './customer'
import Payment from './payment'
import Project from './project'

const Revenue = new Model({

  databaseName: 'maha',

  tableName: 'finance_revenues',

  rules: {},

  virtuals: {},

  customer() {
    return this.belongsTo(Customer, 'customer_id')
  },

  payment() {
    return this.belongsTo(Payment, 'payment_id')
  },

  program() {
    return this.belongsTo(Program, 'program_id')
  },

  project() {
    return this.belongsTo(Project, 'project_id')
  },

  revenue_type() {
    return this.belongsTo(RevenueType, 'revenue_type_id')
  }

})

export default Revenue
