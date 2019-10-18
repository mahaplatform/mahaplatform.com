import Model from '../../../core/objects/model'
import Enrollment from './enrollment'

const Workflow = new Model({

  tableName: 'crm_workflows',

  rules: {},

  virtuals: {},

  enrollments() {
    return this.hasMany(Enrollment, 'workflow_id')
  }

})

export default Workflow
