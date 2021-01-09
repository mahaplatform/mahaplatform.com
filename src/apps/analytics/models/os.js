import Model from '@core/objects/model'
import Session from './session'

const OS = new Model({

  databaseName: 'analytics',

  tableName: 'oses',

  hasTimestamps: false,

  rules: {},

  virtuals: {},

  sessions() {
    return this.hasMany(Session, 'app_id')
  }

})

export default OS
