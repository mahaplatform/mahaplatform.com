import Model from '@core/objects/model'
import knex from '@core/vendor/knex/analytics'
import Session from './session'

const DomainUser = new Model(knex, {

  databaseName: 'analytics',

  tableName: 'domain_users',

  hasTimestamps: false,

  rules: {},

  virtuals: {},

  sessions() {
    return this.hasMany(Session, 'domain_user_id')
  }

})

export default DomainUser
