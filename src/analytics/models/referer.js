import Model from '@core/objects/model'
import knex from '@core/vendor/knex/analytics'
import Event from './event'

const Referer = new Model(knex, {

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
