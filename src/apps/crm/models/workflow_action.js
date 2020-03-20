import WorkflowEnrollment from './workflow_enrollment'
import WorkflowRecording from './workflow_recording'
import Model from '../../../core/objects/model'
import WorkflowStep from './workflow_step'

const WorkflowAction = new Model({

  tableName: 'crm_workflow_actions',

  rules: {},

  virtuals: {},

  enrollment() {
    return this.belongsTo(WorkflowEnrollment, 'enrollment_id')
  },

  recordings() {
    return this.hasOne(WorkflowRecording, 'action_id')
  },

  step() {
    return this.belongsTo(WorkflowStep, 'step_id')
  }

})

export default WorkflowAction
