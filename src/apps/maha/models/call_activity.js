import CallConnection from '@apps/maha/models/call_connection'
import Model from '@core/objects/model'

const CallActivity = new Model({

  databaseName: 'maha',

  tableName: 'call_activities',

  rules: {},

  virtuals: {},

  connection() {
    return this.belongsTo(CallConnection, 'call_connection_id')
  }

})

export default CallActivity
