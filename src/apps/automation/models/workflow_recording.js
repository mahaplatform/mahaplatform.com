import knex from '@core/vendor/knex/maha'
import Model from '@core/objects/model'
import WorkflowAction from './workflow_action'
import Asset from '@apps/maha/models/asset'

const WorkflowRecording = new Model(knex, {

  databaseName: 'maha',

  tableName: 'crm_workflow_recordings',

  rules: {},

  virtuals: {

    url() {
      return `${process.env.ADMIN_HOST}/crm/recordings/${this.get('code')}`
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
