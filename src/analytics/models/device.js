import Model from '@core/objects/model'
import knex from '@core/vendor/knex/analytics'
import Session from './session'

const Device = new Model(knex, {

  databaseName: 'analytics',

  tableName: 'devices',

  hasTimestamps: false,

  rules: {},

  virtuals: {},

  sessions() {
    return this.hasMany(Session, 'app_id')
  }

})

export default Device
