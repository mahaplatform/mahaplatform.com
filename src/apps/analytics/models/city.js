import Model from '@core/objects/model'
import IPAddress from './ipaddress'

const City = new Model({

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
