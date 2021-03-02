import Model from '@core/analytics/objects/model'
import Session from './session'

const Medium = new Model({

  databaseName: 'analytics',

  tableName: 'mediums',

  hasTimestamps: false,

  rules: {},

  virtuals: {},

  sessions() {
    return this.hasMany(Session, 'app_id')
  }

})

export default Medium
