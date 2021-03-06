import Model from '@core/objects/model'
import knex from '@core/vendor/knex/analytics'
import Event from './event'

const EventType = new Model(knex, {

  databaseName: 'analytics',

  tableName: 'event_types',

  hasTimestamps: false,

  rules: {},

  virtuals: {},

  events() {
    return this.hasMany(Event, 'event_type_id')
  }

})

export default EventType
