import WorkflowEnrollment from './workflow_enrollment'
import Model from '../../../core/objects/model'
import Program from '../../crm/models/program'
import Field from '../../maha/models/field'
import Email from '../../maha/models/email'
import Asset from '../../maha/models/asset'
import WorkflowStep from './workflow_step'
import Topic from '../../crm/models/topic'
import User from '../../maha/models/user'
import List from '../../crm/models/list'
import Sms from '../../maha/models/sms'
import Workflow from './workflow'

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
