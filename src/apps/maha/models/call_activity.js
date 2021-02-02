import CallConnection from '@apps/maha/models/call_connection'
import Story from '@apps/maha/models/story'
import Model from '@core/objects/model'

const CallActivity = new Model({

  databaseName: 'maha',

  tableName: 'maha_call_activities',

  hasTimestamps: false,

  rules: {},

  virtuals: {},

  connection() {
    return this.belongsTo(CallConnection, 'call_connection_id')
  },

  story() {
    return this.belongsTo(Story, 'story_id')
  }

})

export default CallActivity
