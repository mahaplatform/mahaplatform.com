import Model from '../../../core/objects/model'
import Enrollment from './enrollment'
import Step from './step'

const Action = new Model({

  tableName: 'crm_actions',

  rules: {},

  virtuals: {},

  enrollment() {
    return this.belongsTo(Enrollment, 'enrollment_id')
  },

  step() {
    return this.belongsTo(Step, 'step_id')
  }

})

export default Action
