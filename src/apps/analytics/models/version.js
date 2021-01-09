import Model from '@core/objects/model'
import Session from './session'

const Version = new Model({

  databaseName: 'analytics',

  tableName: 'versions',

  hasTimestamps: false,

  rules: {},

  virtuals: {},

  sessions() {
    return this.hasMany(Session, 'app_id')
  }

})

export default Version
