import Model from '@core/objects/model'
import Session from './session'

const Campaign = new Model({

  databaseName: 'analytics',

  tableName: 'campaigns',

  hasTimestamps: false,

  rules: {},

  virtuals: {},

  sessions() {
    return this.hasMany(Session, 'app_id')
  }

})

export default Campaign
