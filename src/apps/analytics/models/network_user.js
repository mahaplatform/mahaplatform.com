import Model from '@core/objects/model'
import DomainUser from './domain_user'
import Contact from './contact'

const NetworkUser = new Model({

  databaseName: 'analytics',

  tableName: 'network_users',

  hasTimestamps: false,

  rules: {},

  virtuals: {},

  contacts() {
    return this.hasMany(Contact, 'network_user_id')
  },

  domain_users() {
    return this.hasMany(DomainUser, 'domain_user_id')
  }

})

export default NetworkUser
