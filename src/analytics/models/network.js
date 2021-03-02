import Model from '@core/objects/model'
import knex from '@core/vendor/knex/analytics'
import Event from './event'

const Network = new Model(knex, {

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
