import WorkflowEnrollment from './workflow_enrollment'
import Model from '../../../core/objects/model'
import WorkflowResult from './workflow_result'
import WorkflowStep from './workflow_step'
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
    return this.hasMany(WorkflowEnrollment, 'workflow_id')
  },

  program() {
    return this.belongsTo(Program, 'program_id')
  },

  steps() {
    return this.hasMany(WorkflowStep, 'workflow_id')
  },

  results() {
    return this.hasOne(WorkflowResult, 'email_id')
  }

})

export default Workflow
