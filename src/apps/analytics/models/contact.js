import NetworkUser from './network_user'
import Model from '@core/objects/model'

const Contact = new Model({

  databaseName: 'analytics',

  tableName: 'contacts',

  hasTimestamps: false,

  rules: {},

  virtuals: {},

  network_user() {
    return this.belongsTo(NetworkUser, 'network_user_id')
  }

})

export default Contact
