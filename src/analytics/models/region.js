import Model from '@core/objects/model'
import knex from '@core/vendor/knex/analytics'
import IPAddress from './ipaddress'

const Region = new Model(knex, {

  databaseName: 'analytics',

  tableName: 'regions',

  hasTimestamps: false,

  rules: {},

  virtuals: {},

  ipaddresses() {
    return this.hasMany(IPAddress, 'region_id')
  }

})

export default Region
