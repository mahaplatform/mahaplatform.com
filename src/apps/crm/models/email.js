import Model from '../../../core/objects/model'
import Workflow from './workflow'
import Sender from './sender'

const Email = new Model({

  tableName: 'crm_emails',

  rules: {},

  virtuals: {},

  sender() {
    return this.belongsTo(Sender, 'sender_id')
  },

  workflow() {
    return this.belongsTo(Workflow, 'workflow_id')
  }

})

export default Email
