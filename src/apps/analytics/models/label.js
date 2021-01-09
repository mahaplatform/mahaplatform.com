import Model from '@core/objects/model'
import Event from './event'

const Label = new Model({

  databaseName: 'analytics',

  tableName: 'labels',

  hasTimestamps: false,

  rules: {},

  virtuals: {},

  events() {
    return this.hasMany(Event, 'page_id')
  }

})

export default Label
