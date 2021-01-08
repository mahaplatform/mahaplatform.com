import Model from '@core/objects/model'
import PostalCode from './postal_code'
import MetroCode from './metro_code'
import Session from './session'
import Country from './country'
import Region from './region'
import City from './city'

const IPAddress = new Model({

  databaseName: 'analytics',

  tableName: 'ipaddresses',

  hasTimestamps: false,

  rules: {},

  virtuals: {},

  city() {
    return this.belongsTo(City, 'city_id')
  },

  country() {
    return this.belongsTo(Country, 'country_id')
  },

  metro_code() {
    return this.belongsTo(MetroCode, 'metro_code_id')
  },

  postal_code() {
    return this.belongsTo(PostalCode, 'postal_code_id')
  },

  region() {
    return this.belongsTo(Region, 'region_id')
  },

  sessions() {
    return this.hasMany(Session, 'ipaddress_id')
  }

})

export default IPAddress
