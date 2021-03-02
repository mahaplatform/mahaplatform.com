import Model from '@core/objects/model'
import knex from '@core/vendor/knex/analytics'
import Session from './session'

const Term = new Model(knex, {

  databaseName: 'analytics',

  tableName: 'terms',

  hasTimestamps: false,

  rules: {},

  virtuals: {},

  sessions() {
    return this.hasMany(Session, 'app_id')
  }

})

export default Term
