import Model from '@core/objects/model'
import NetworkUser from './network_user'

const DomainUser = new Model({

  databaseName: 'analytics',

  tableName: 'domain_users',

  hasTimestamps: false,

  rules: {},

  virtuals: {},

  network_user() {
    return this.belongsTo(NetworkUser, 'network_user_id')
  }

})

export default DomainUser
