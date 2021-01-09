import Model from '@core/objects/model'
import Session from './session'

const Device = new Model({

  databaseName: 'analytics',

  tableName: 'devices',

  hasTimestamps: false,

  rules: {},

  virtuals: {},

  sessions() {
    return this.hasMany(Session, 'app_id')
  }

})

export default Device
