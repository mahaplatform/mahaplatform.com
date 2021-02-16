import WorkflowEnrollment from './workflow_enrollment'
import Program from '@apps/crm/models/program'
import Field from '@apps/maha/models/field'
import Email from '@apps/maha/models/email'
import Asset from '@apps/maha/models/asset'
import WorkflowStep from './workflow_step'
import Topic from '@apps/crm/models/topic'
import User from '@apps/maha/models/user'
import List from '@apps/crm/models/list'
import Sms from '@apps/maha/models/sms'
import Model from '@core/objects/model'
import Workflow from './workflow'

const WorkflowAction = new Model({

  databaseName: 'maha',

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

  sms() {
    return this.belongsTo(Sms, 'sms_id')
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
