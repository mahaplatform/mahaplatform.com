import Model from '@core/objects/model'
import Event from './event'

const Action = new Model({

  databaseName: 'analytics',

  tableName: 'actions',

  hasTimestamps: false,

  rules: {},

  virtuals: {},

  events() {
    return this.hasMany(Event, 'page_id')
  }

})

export default Action
