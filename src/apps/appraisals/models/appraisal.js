import Model from '@core/objects/model'
import Responsibility from './responsibility'
import User from '@apps/maha/models/user'

const Appraisal = new Model({

  tableName: 'appraisals_appraisals',

  rules: {},

  virtuals: {},

  employee() {
    return this.belongsTo(User, 'employee_id')
  },

  responsibilities() {
    return this.hasMany(Responsibility, 'appraisal_id')
  },

  supervisor() {
    return this.belongsTo(User, 'supervisor_id')
  }

})

export default Appraisal
