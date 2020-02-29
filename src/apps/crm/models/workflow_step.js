import Model from '../../../core/objects/model'
import WorkflowAction from './workflow_action'
import Workflow from './workflow'

const WorkflowStep = new Model({

  tableName: 'crm_workflow_steps',

  rules: {},

  virtuals: {},

  actions() {
    return this.hasMany(WorkflowAction, 'step_id')
  },

  workflow() {
    return this.belongsTo(Workflow, 'workflow_id')
  }

})

export default WorkflowStep
