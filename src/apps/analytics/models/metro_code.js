import Model from '@core/objects/model'
import IPAddress from './ipaddress'

const MetroCode = new Model({

  databaseName: 'analytics',

  tableName: 'metro_codes',

  rules: {},

  virtuals: {},

  ipaddresses() {
    return this.hasMany(IPAddress, 'metro_code_id')
  }

})

export default MetroCode
