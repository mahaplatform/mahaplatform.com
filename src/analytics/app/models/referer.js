import Model from '@core/objects/model'
import Event from './event'

const Referer = new Model({

  databaseName: 'analytics',

  tableName: 'referers',

  hasTimestamps: false,

  rules: {},

  virtuals: {},


  events() {
    return this.hasMany(Event, 'referer_id')
  }

})

export default Referer
