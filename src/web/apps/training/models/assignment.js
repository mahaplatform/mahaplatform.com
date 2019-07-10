import User from '../../maha/models/user'
import Training from './training'
import Offering from './offering'
import Model from '../../../core/objects/model'

const Assignment = new Model({

  tableName: 'training_assignments',

  rules: {},

  virtuals: {},

  assigned_by() {
    return this.belongsTo(User, 'assigned_by_id')
  },

  employee() {
    return this.belongsTo(User, 'employee_id')
  },

  offering() {
    return this.belongsTo(Offering, 'offering_id')
  },

  training() {
    return this.belongsTo(Training, 'training_id')
  }

})

export default Assignment
