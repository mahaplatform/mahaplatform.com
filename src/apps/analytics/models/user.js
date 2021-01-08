import Model from '@core/objects/model'
import Session from './session'

const User = new Model({

  databaseName: 'analytics',

  tableName: 'users',

  hasTimestamps: false,

  rules: {},

  virtuals: {},

  sessions() {
    return this.hasMany(Session, 'user_id')
  }

})

export default User
