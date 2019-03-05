import { Model, User } from 'maha'
import Goal from './goal'
import Commitment from './commitment'

const Plan = new Model ({

  tableName: 'competencies_plans',

  rules: {
    supervisor_id: 'required',
    employee_id: 'required',
    due: 'required'
  },

  virtuals: {

    object_owner_id: function() {
      return this.get('employee_id')
    },

    object_text: function() {
      return this.get('id')
    },

    object_type: function() {
      return 'plan'
    },

    object_url: function() {
      return `/admin/competencies/plans/${this.get('id')}`
    }

  },

  commitments() {
    return this.hasMany(Commitment, 'plan_id')
  },

  goals() {
    return this.hasMany(Goal, 'plan_id')
  },

  supervisor() {
    return this.belongsTo(User, 'supervisor_id')
  },

  employee() {
    return this.belongsTo(User, 'employee_id')
  }

})

export default Plan
