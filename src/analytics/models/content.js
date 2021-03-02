import Model from '@core/objects/model'
import knex from '@core/vendor/knex/analytics'
import Session from './session'

const Content = new Model(knex, {

  databaseName: 'analytics',

  tableName: 'contents',

  hasTimestamps: false,

  rules: {},

  virtuals: {},

  sessions() {
    return this.hasMany(Session, 'app_id')
  }

})

export default Content
