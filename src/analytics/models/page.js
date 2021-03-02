import Model from '@core/objects/model'
import knex from '@core/vendor/knex/analytics'
import Event from './event'

const Page = new Model(knex, {

  databaseName: 'analytics',

  tableName: 'pages',

  hasTimestamps: false,

  rules: {},

  virtuals: {},

  events() {
    return this.hasMany(Event, 'page_id')
  }

})

export default Page
