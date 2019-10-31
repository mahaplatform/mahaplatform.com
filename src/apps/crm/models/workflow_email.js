import Model from '../../../core/objects/model'
import Workflow from './workflow'
import Sender from './sender'

const WorkflowEmail = new Model({

  tableName: 'crm_workflow_emails',

  rules: {},

  virtuals: {},

  sender() {
    return this.belongsTo(Sender, 'sender_id')
  },

  workflow() {
    return this.belongsTo(Workflow, 'workflow_id')
  }

})

export default WorkflowEmail
