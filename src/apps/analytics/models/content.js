import Model from '@core/objects/model'
import Session from './session'

const Content = new Model({

  databaseName: 'analytics',

  tableName: 'contents',

  hasTimestamps: false,

  rules: {},

  virtuals: {},

  sessions() {
    return this.hasMany(Session, 'app_id')
  }

})

export default Content
