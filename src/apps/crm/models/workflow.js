import Model from '../../../core/objects/model'
import Enrollment from './enrollment'
import Program from './program'
import Email from './email'
import Form from './form'

const Workflow = new Model({

  tableName: 'crm_workflows',

  rules: {},

  virtuals: {},

  emails() {
    return this.hasMany(Email, 'workflow_id')
  },

  form() {
    return this.belongsTo(Form, 'form_id')
  },

  enrollments() {
    return this.hasMany(Enrollment, 'workflow_id')
  },

  program() {
    return this.belongsTo(Program, 'program_id')
  }

})

export default Workflow
