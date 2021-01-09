import Model from '@core/objects/model'
import Event from './event'

const Network = new Model({

  databaseName: 'analytics',

  tableName: 'networks',

  hasTimestamps: false,

  rules: {},

  virtuals: {},

  events() {
    return this.hasMany(Event, 'page_id')
  }

})

export default Network
