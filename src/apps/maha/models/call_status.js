import CallConnection from '@apps/maha/models/call_connection'
import Model from '@core/objects/model'

const CallStatus = new Model({

  databaseName: 'maha',

  tableName: 'maha_call_statuses',

  hasTimestamps: false,

  rules: {},

  virtuals: {},

  connection() {
    return this.belongsTo(CallConnection, 'call_connection_id')
  }

})

export default CallStatus
