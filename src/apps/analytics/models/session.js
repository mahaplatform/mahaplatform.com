import Model from '@core/objects/model'
import IPAddress from './ipaddress'
import Referer from './referer'
import User from './user'
import App from './app'

const Session = new Model({

  databaseName: 'analytics',

  tableName: 'sessions',

  hasTimestamps: false,

  rules: {},

  virtuals: {},

  app() {
    return this.belongsTo(App, 'app_id')
  },

  events() {
    return this.hasMany(Event, 'session_id')
  },

  ipaddress() {
    return this.belongsTo(IPAddress, 'ipaddress_id')
  },

  referer() {
    return this.belongsTo(Referer, 'referer_id')
  },

  user() {
    return this.belongsTo(User, 'user_id')
  }

})

export default Session
