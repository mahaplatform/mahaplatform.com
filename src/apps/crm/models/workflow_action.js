import WorkflowEnrollment from './workflow_enrollment'
import Model from '../../../core/objects/model'
import Field from '../../maha/models/field'
import Email from '../../maha/models/email'
import Asset from '../../maha/models/asset'
import WorkflowStep from './workflow_step'
import User from '../../maha/models/user'
import Workflow from './workflow'
import Program from './program'
import Topic from './topic'
import List from './list'

const WorkflowAction = new Model({

  tableName: 'crm_workflow_actions',

  rules: {},

  virtuals: {},

  asset() {
    return this.belongsTo(Asset, 'asset_id')
  },

  email() {
    return this.belongsTo(Email, 'email_id')
  },

  enrollment() {
    return this.belongsTo(WorkflowEnrollment, 'enrollment_id')
  },

  field() {
    return this.belongsTo(Field, 'field_id')
  },

  list() {
    return this.belongsTo(List, 'list_id')
  },

  program() {
    return this.belongsTo(Program, 'program_id')
  },

  recording() {
    return this.belongsTo(Asset, 'recording_id')
  },

  step() {
    return this.belongsTo(WorkflowStep, 'step_id')
  },

  topic() {
    return this.belongsTo(Topic, 'topic_id')
  },

  user() {
    return this.belongsTo(User, 'user_id')
  },

  workflow() {
    return this.belongsTo(Workflow, 'workflow_id')
  }

})

export default WorkflowAction
