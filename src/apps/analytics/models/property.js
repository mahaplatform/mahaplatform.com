import Model from '@core/objects/model'
import Event from './event'

const Property = new Model({

  databaseName: 'analytics',

  tableName: 'properties',

  hasTimestamps: false,

  rules: {},

  virtuals: {},

  events() {
    return this.hasMany(Event, 'page_id')
  }

})

export default Property
