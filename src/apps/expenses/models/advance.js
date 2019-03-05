import { Model, User } from 'maha'
import ExpenseType from './expense_type'
import Project from './project'
import Status from  './status'

const Advances = new Model({

  tableName: 'expenses_advances',

  rules: {
    date_needed: ['required', 'datestring'],
    description: ['required']
  },

  virtuals: {

    approver_ids: function() {

      if(!this.get('project_id')) return []

      const filter = member => member.get('member_type_id') !== 3

      const map = member => member.get('user_id')

      return this.related('project').related('members').filter(filter).map(map)

    },

    owner_id: function() {
      return this.get('user_id')
    },

    url: function() {
      return `/expenses/advances/${this.get('id')}`
    }

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
  }

})

export default Advances
