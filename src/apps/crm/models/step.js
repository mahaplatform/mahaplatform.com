import Model from '../../../core/objects/model'
import Workflow from './workflow'
import Action from './action'

const Step = new Model({

  tableName: 'crm_steps',

  rules: {},

  virtuals: {},

  actions() {
    return this.belongsTo(Action, 'step_id')
  },

  parent() {
    return this.belongsTo(Step, 'parent_id')
  },

  workflow() {
    return this.belongsTo(Workflow, 'workflow_id')
  }

})

export default Step
