import Model from '@core/objects/model'
import Session from './session'

const Source = new Model({

  databaseName: 'analytics',

  tableName: 'sources',

  hasTimestamps: false,

  rules: {},

  virtuals: {},

  sessions() {
    return this.hasMany(Session, 'app_id')
  }

})

export default Source
