import Model from '@core/objects/model'
import IPAddress from './ipaddress'

const Country = new Model({

  databaseName: 'analytics',

  tableName: 'countries',

  hasTimestamps: false,

  rules: {},

  virtuals: {},

  ipaddresses() {
    return this.hasMany(IPAddress, 'city_id')
  }

})

export default Country
