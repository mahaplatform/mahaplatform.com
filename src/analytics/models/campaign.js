import Model from '@core/objects/model'
import knex from '@core/vendor/knex/analytics'
import Session from './session'

const Campaign = new Model(knex, {

  databaseName: 'analytics',

  tableName: 'campaigns',

  hasTimestamps: false,

  rules: {},

  virtuals: {},

  sessions() {
    return this.hasMany(Session, 'app_id')
  }

})

export default Campaign
