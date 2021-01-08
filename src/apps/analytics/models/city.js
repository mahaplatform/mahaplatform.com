import Model from '@core/objects/model'
import IPAddress from './ipaddress'

const City = new Model({

  databaseName: 'analytics',

  tableName: 'cities',

  rules: {},

  virtuals: {},

  ipaddresses() {
    return this.hasMany(IPAddress, 'city_id')
  }

})

export default City
