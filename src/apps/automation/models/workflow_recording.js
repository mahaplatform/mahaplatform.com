import Model from '../../../core/objects/model'
import WorkflowAction from './workflow_action'
import Asset from '../../maha/models/asset'

const WorkflowRecording = new Model({

  tableName: 'crm_workflow_recordings',

  rules: {},

  virtuals: {

    url() {
      return `${process.env.WEB_HOST}/crm/recordings/${this.get('code')}`
    }

  },

  action() {
    return this.belongsTo(WorkflowAction, 'action_id')
  },

  asset() {
    return this.belongsTo(Asset, 'asset_id')
  }

})

export default WorkflowRecording
