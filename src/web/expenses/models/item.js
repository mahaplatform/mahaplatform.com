import { Model, User } from 'maha'
import Account from  './account'
import ExpenseType from  './expense_type'
import Project from  './project'
import Status from  './status'
import Vendor from  './vendor'

const Item = new Model({

  tableName: 'expenses_items',

  virtuals: {

    idglacct: function() {

      if(!this.get('expense_type_id')) return null

      if(!this.get('project_id')) return null

      console.log('TEST', this.get('expense_type_id'))

      const expense_type = this.related('expense_type').get('integration')

      const expense_code = expense_type.expense_code

      const expense_type_source_code = expense_type ? expense_type.source_code : null

      const project = this.related('project').get('integration')

      const project_code = project.project_code

      const program_code = project.program_code

      const source_code = expense_type_source_code || project.source_code

      const match = project.match

      return `${expense_code}-${program_code}-${source_code}-${match}-${project_code}`

    }

  },

  account() {
    return this.belongsTo(Account, 'account_id')
  },

  expense_type() {
    return this.belongsTo(ExpenseType, 'expense_type_id')
  },

  project() {
    return this.belongsTo(Project, 'project_id')
  },

  status() {
    return this.belongsTo(Status, 'status_id')
  },

  user() {
    return this.belongsTo(User, 'user_id')
  },

  vendor() {
    return this.belongsTo(Vendor, 'vendor_id')
  }

})

export default Item
