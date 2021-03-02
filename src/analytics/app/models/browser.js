import Model from '@core/objects/model'
import Session from './session'

const Browser = new Model({

  databaseName: 'analytics',

  tableName: 'browsers',

  hasTimestamps: false,

  rules: {},

  virtuals: {},

  sessions() {
    return this.hasMany(Session, 'app_id')
  }

})

export default Browser
