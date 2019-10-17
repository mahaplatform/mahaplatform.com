import Model from '../../../core/objects/model'
import Enrollment from './enrollment'
import Step from './step'

const Workflow = new Model({

  tableName: 'crm_workflows',

  rules: {},

  virtuals: {},

  enrollments() {
    return this.hasMany(Enrollment, 'workflow_id')
  },

  steps() {
    return this.hasMany(Step, 'workflow_id')
  }

})

export default Workflow
