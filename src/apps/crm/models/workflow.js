import WorkflowEnrollment from './workflow_enrollment'
import Model from '../../../core/objects/model'
import WorkflowResult from './workflow_result'
import Field from '../../maha/models/field'
import WorkflowStep from './workflow_step'
import Program from './program'
import Topic from './topic'
import Email from './email'
import Form from './form'
import List from './list'

const Workflow = new Model({

  tableName: 'crm_workflows',

  rules: {},

  virtuals: {},

  emails() {
    return this.hasMany(Email, 'workflow_id')
  },

  email() {
    return this.belongsTo(Email, 'email_id')
  },

  enrollments() {
    return this.hasMany(WorkflowEnrollment, 'workflow_id')
  },

  field() {
    return this.belongsTo(Field, 'field_id')
  },

  form() {
    return this.belongsTo(Form, 'form_id')
  },

  list() {
    return this.belongsTo(List, 'list_id')
  },

  program() {
    return this.belongsTo(Program, 'program_id')
  },

  steps() {
    return this.hasMany(WorkflowStep, 'workflow_id')
  },

  results() {
    return this.hasOne(WorkflowResult, 'email_id')
  },

  topic() {
    return this.belongsTo(Topic, 'topic_id')
  }

})

export default Workflow
