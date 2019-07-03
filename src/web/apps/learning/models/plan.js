import Model from '../../../core/objects/model'
import User from '../../maha/models/user'
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

    object_owner_id() {
      return this.get('employee_id')
    },

    object_text() {
      return this.get('id')
    },

    object_type() {
      return 'plan'
    },

    object_url() {
      return `/admin/learning/plans/${this.get('id')}`
    }

  },

  commitments() {
    return this.hasMany(Commitment, 'plan_id')
  },

  goals() {
    return this.hasMany(Goal, 'plan_id')
  },

  listener_ids(trx) {
    return [
      this.get('supervisor_id'),
      this.get('employee_id')
    ]
  },

  supervisor() {
    return this.belongsTo(User, 'supervisor_id')
  },

  employee() {
    return this.belongsTo(User, 'employee_id')
  }

})

export default Plan
