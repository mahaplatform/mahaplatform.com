import Model from '@core/objects/model'
import IPAddress from './ipaddress'

const Region = new Model({

  databaseName: 'analytics',

  tableName: 'regions',

  rules: {},

  virtuals: {},

  ipaddresses() {
    return this.hasMany(IPAddress, 'region_id')
  }

})

export default Region
