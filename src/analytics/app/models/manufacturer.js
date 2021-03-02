import Model from '@core/objects/model'
import Session from './session'

const Manufacturer = new Model({

  databaseName: 'analytics',

  tableName: 'manufacturers',

  hasTimestamps: false,

  rules: {},

  virtuals: {},

  sessions() {
    return this.hasMany(Session, 'app_id')
  }

})

export default Manufacturer
