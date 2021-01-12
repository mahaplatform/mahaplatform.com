import Model from '@core/objects/model'
import Session from './session'

const DomainUser = new Model({

  databaseName: 'analytics',

  tableName: 'domain_users',

  hasTimestamps: false,

  rules: {},

  virtuals: {},

  sessions() {
    return this.hasMany(Session, 'domain_user_id')
  }

})

export default DomainUser
