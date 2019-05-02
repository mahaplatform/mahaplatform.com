import { Model, User } from 'maha'
import ExpenseType from  './expense_type'
import Project from  './project'
import Status from  './status'

const Trip = new Model({

  tableName: 'expenses_trips',

  rules: {
    date: ['required','datestring'],
    description: ['required'],
    time_leaving: ['time'],
    time_arriving: ['time','laterThan:time_leaving'],
    odometer_start: ['numeric'],
    odometer_end: ['numeric','greaterThanField:odometer_start']
  },

  virtuals: {

    approver_ids: function() {

      if(!this.get('project_id')) return []

      const filter = member => member.get('member_type_id') !== 3

      const map = member => member.get('user_id')

      return this.related('project').related('members').filter(filter).map(map)

    },

    object_owner_id: function() {
      return this.get('user_id')
    },

    object_text: function() {
      return this.get('description')
    },

    object_type: function() {
      return 'trip'
    },

    object_url: function() {
      return `/admin/expenses/trips/${this.get('id')}`
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

export default Trip
