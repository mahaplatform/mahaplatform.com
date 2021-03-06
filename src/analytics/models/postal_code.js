import Model from '@core/objects/model'
import knex from '@core/vendor/knex/analytics'
import IPAddress from './ipaddress'

const PostalCode = new Model(knex, {

  databaseName: 'analytics',

  tableName: 'postal_codes',

  hasTimestamps: false,

  rules: {},

  virtuals: {},

  ipaddresses() {
    return this.hasMany(IPAddress, 'postal_code_id')
  }


})

export default PostalCode
