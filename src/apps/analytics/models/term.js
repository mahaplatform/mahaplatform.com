import Model from '@core/objects/model'
import Session from './session'

const Term = new Model({

  databaseName: 'analytics',

  tableName: 'terms',

  hasTimestamps: false,

  rules: {},

  virtuals: {},

  sessions() {
    return this.hasMany(Session, 'app_id')
  }

})

export default Term
