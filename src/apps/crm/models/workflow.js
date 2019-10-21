import Model from '../../../core/objects/model'
import Enrollment from './enrollment'
import Program from './program'

const Workflow = new Model({

  tableName: 'crm_workflows',

  rules: {},

  virtuals: {},

  enrollments() {
    return this.hasMany(Enrollment, 'workflow_id')
  },

  program() {
    return this.belongsTo(Program, 'program_id')
  }

})

export default Workflow
