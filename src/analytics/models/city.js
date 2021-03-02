import Model from '@core/objects/model'
import knex from '@core/vendor/knex/analytics'
import IPAddress from './ipaddress'

const City = new Model(knex, {

  databaseName: 'analytics',

  tableName: 'cities',

  hasTimestamps: false,

  rules: {},

  virtuals: {},

  ipaddresses() {
    return this.hasMany(IPAddress, 'city_id')
  }

})

export default City
